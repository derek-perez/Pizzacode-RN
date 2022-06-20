export interface UserProps {
    _id: string;
    nombre: string;
    correo: string;
    telefono: string;

    cards: string[];
    direcciones: string[];
    pagos: string[];
}

export interface Categoria {
    _id: string;
    nombre: string;
    titulo: string;
    productos: string[];
}

export interface Direccion {
    _id: string;
    calle: string;
    numero: string;
    colonia: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
}

export interface Tarjeta {
    _id: string;
    numero: string;
    cvv: string;
    fechaExpiracion: string;
    nombre: string;
}

export interface Pago {
    _id: string;
    fecha: string;
    productos: PagoEnHistorial[];
    total: string;
    invitado: string;
    efectivo: string;
    tarjeta: string;
}

export interface PagoEnHistorial {
    producto: string;
    total: string;
    cantidad: string;
}

export interface Producto {
    producto: {
        _id: string;
        imagen: string;
        nombre: string;
        descripcion: string;
        precio?: number;
        categoria?: string;
        cuentaAtras?: string;
    }
}

export interface ProductoNormal {
    _id: string;
    imagen: string;
    nombre: string;
    descripcion: string;
    precio?: number;
    cantidad?: number;
    precioTotal?: number;
    categoria?: string;
    cuentaAtras?: string;
}