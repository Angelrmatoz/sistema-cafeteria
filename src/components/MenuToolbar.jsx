import Button from "./Button";

const MenuToolbar = ({
  navigate,
  handleCloseCaja,
  isFullscreen,
  toggleFullscreen,
}) => {
  return (
    <div className="productos-sidebar__header">
      <div className="menu__buttons">
        <Button
          className="menu__buttons--primary"
          variant="secondary"
          type="button"
          onClick={() => navigate("/home")}
        >
          Volver
        </Button>
        <Button
          className="menu__buttons--primary"
          variant="danger"
          type="button"
          onClick={handleCloseCaja}
        >
          Cerrar caja
        </Button>
        <Button
          className="menu__buttons--secondary"
          variant="primary"
          type="button"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? "ESC" : "Fullscreen"}
        </Button>
      </div>
      <h2>Menú</h2>
    </div>
  );
};

export default MenuToolbar;
