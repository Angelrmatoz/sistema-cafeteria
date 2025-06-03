/**
 * Funciones de utilidad para gestionar el inventario de la cafetería
 */

import { products } from "../data/products";
import { categories } from "../data/categories";

// Cargar inventario desde localStorage o usar datos predeterminados
export const loadInventory = () => {
    try {
        const savedInventory = localStorage.getItem('cafeteria_inventory');
        return savedInventory ? JSON.parse(savedInventory) : products;
    } catch (error) {
        console.error("Error al cargar el inventario:", error);
        return products;
    }
};

// Guardar inventario en localStorage
export const saveInventory = (inventory) => {
    try {
        localStorage.setItem('cafeteria_inventory', JSON.stringify(inventory));
        updateCategoryCounts(inventory);
    } catch (error) {
        console.error("Error al guardar el inventario:", error);
    }
};

// Actualizar la cantidad de productos en cada categoría
export const updateCategoryCounts = (inventory) => {
    // Crear un objeto para contar los productos por categoría
    const categoryCounts = {};

    // Contar productos por categoría
    inventory.forEach(product => {
        const categoryId = product.category;
        if (!categoryCounts[categoryId]) {
            categoryCounts[categoryId] = 0;
        }
        categoryCounts[categoryId]++;
    });

    // Actualizar las categorías
    const updatedCategories = categories.map(category => ({
        ...category,
        items: categoryCounts[category.id] || 0
    }));

    // Guardar categorías actualizadas
    try {
        localStorage.setItem('cafeteria_categories', JSON.stringify(updatedCategories));
        return updatedCategories;
    } catch (error) {
        console.error("Error al actualizar las categorías:", error);
        return categories;
    }
};

// Generar un ID único para nuevos productos
export const generateProductId = (inventory) => {
    if (!inventory || inventory.length === 0) return 1;
    const maxId = Math.max(...inventory.map(item => parseInt(item.id)));
    return maxId + 1;
};

// Calcular el precio con impuesto incluido
export const calculatePriceWithTax = (price, taxRate) => {
    if (!price || isNaN(price)) return 0;
    if (!taxRate || isNaN(taxRate)) return parseFloat(price);

    const taxAmount = parseFloat(price) * (parseFloat(taxRate) / 100);
    return parseFloat(price) + taxAmount;
};

// Validar datos del producto
export const validateProductData = (productData) => {
    const errors = {};

    if (!productData.name || productData.name.trim() === '') {
        errors.name = "El nombre del producto es requerido";
    }

    if (!productData.price || isNaN(productData.price) || productData.price <= 0) {
        errors.price = "El precio debe ser un número mayor a cero";
    }

    if (!productData.category) {
        errors.category = "La categoría es requerida";
    }

    if (productData.tax === undefined || productData.tax === "") {
        errors.tax = "Debe seleccionar un tipo de impuesto";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
