class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }


    getFullName() {
        console.log (`Mi Nombre Completo es: ${this.nombre} ${this.apellido}`)
    }

    addMascota(newMascota) {
        this.mascotas.push(newMascota)
    }

    countMascotas(mascotas) {
       console.log(`Tengo ${this.mascotas.length} Mascotas: ${this.mascotas}`)
    }

    addBook(titulo, autor) {
        this.libros.push({ titulo, autor })
    }

    getBookNames(libros) {
        const nombreLibros = libros.map(({ titulo }) => (`${titulo}`))
        console.log(`Mis libros favoritos son; ${nombreLibros}`)
    }
}

let usuario1 = new Usuario(
    "Johana",
    "Jimenez",
    [{
        titulo: "El Zahir",
        autor: "Paulo Coelho"
    },
    {
        titulo: "El Alquimista",
        autor: "Paulo Coelho"
    }
    ],
    ["Brandy", "Yorgen"]
);


//Metodos 
usuario1.getFullName();
usuario1.addMascota("Darky");
usuario1.countMascotas();
usuario1.addBook("El pregrino de Compostela", "Paulo Coelho");
usuario1.getBookNames(usuario1.libros);
usuario1.countMascotas(usuario1.mascotas);

