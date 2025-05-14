import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar la funcionalidad de pantalla completa
 * @returns {Object} - Objeto con el estado y funciones de control de pantalla completa
 */
export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Verificar cambios en el estado de pantalla completa
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    // Función para alternar pantalla completa
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error al intentar mostrar pantalla completa: ${err.message}`
                );
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return { isFullscreen, toggleFullscreen };
};