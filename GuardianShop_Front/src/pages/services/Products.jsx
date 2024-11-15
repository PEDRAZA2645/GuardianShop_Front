import useInventory from '../../hooks/useInventory';
import useCart from '../../hooks/cart'; //

const ProductComponent = () => {
  const { services, error } = useInventory();
  const { addToCart } = useCart();

   // Función para manejar la adición al carrito
   const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {error && <p>{error}</p>}

      <div className="container">
        <div className="row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
          {services.map((service) => (
            <div key={service.id} className="col mb-4">
              <div className="card" style={{ width: '18rem' }}>
                <img src={service.imageUrl} className="card-img-top" alt={service.name} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">
                    Precio: ${service.salePrice ? service.salePrice : 'No disponible'}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(service)} // Llamar a la función de agregar al carrito
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
