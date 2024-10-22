async function getProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();

    // Obtener el contenedor donde se mostrará la tabla
    const tableContainer = document.getElementById('product-table');
    
    // Limpiar cualquier contenido previo
    tableContainer.innerHTML = '';

    // Crear la tabla y agregar encabezados
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    
    // Añadir productos como filas en la tabla
    const tbody = table.querySelector('tbody');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.product_id}</td>
            <td>${product.product_name}</td>
            <td>${product.unit_price}</td>
            <td>${product.category_id}</td>
        `;
        tbody.appendChild(row);
    });

    // Añadir la tabla al contenedor
    tableContainer.appendChild(table);
}

async function getProductById() {
    const id = document.getElementById('product-id').value;
    const response = await fetch(`/api/products/${id}`);
    
    // Manejo de errores en caso de que el producto no se encuentre
    if (!response.ok) {
        const productInfo = document.getElementById('product-info');
        productInfo.textContent = 'Producto no encontrado';
        return;
    }
    
    const product = await response.json();
    const productInfo = document.getElementById('product-info');
    
    productInfo.textContent = `${product.product_id} - $${product.product_name}`;
}
