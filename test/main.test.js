// Importación de las clases a testear
import { Book } from "../Book.mjs";
import { BookList } from "../BookList.mjs";

describe("Book Class", () => {

    test("Debe crear un libro con los valores iniciales correctos", () => {
        const book = new Book("El Hobbit", "Fantasía", "Tolkien");

        expect(book.title).toBe("El Hobbit");
        expect(book.genre).toBe("Fantasía");
        expect(book.author).toBe("Tolkien");
        expect(book.read).toBe(false);
        expect(book.date).toBe(0);
    });
});


describe("BookList Class", () => {

    test("Debe inicializar correctamente la lista", () => {
        const lista = new BookList();

        expect(lista.arBooks).toEqual([]);
        expect(lista.read).toBe(0);
        expect(lista.noRead).toBe(0);
        expect(lista.cBook).toBeNull();
        expect(lista.nBook).toBeNull();
        expect(lista.lBook).toBeNull();
    });


    test("addBook debe agregar libros y actualizar cBook y nBook", () => {
        const lista = new BookList();
        const b1 = new Book("Libro1", "Terror", "Autor1");
        const b2 = new Book("Libro2", "Drama", "Autor2");

        lista.addBook(b1);
        expect(lista.arBooks.length).toBe(1);
        expect(lista.cBook).toBe(b1);
        expect(lista.nBook).toBeNull();

        lista.addBook(b2);
        expect(lista.arBooks.length).toBe(2);
        expect(lista.cBook).toBe(b1);
        expect(lista.nBook).toBe(b2);
    });


    test("updateCounts debe contar bien los libros leídos y no leídos", () => {
        const lista = new BookList();

        const b1 = new Book("Libro1", "Terror", "Autor1");
        const b2 = new Book("Libro2", "Drama", "Autor2");
        const b3 = new Book("Libro3", "Sci-fi", "Autor3");

        lista.addBook(b1);
        lista.addBook(b2);
        lista.addBook(b3);

        // Marcamos uno como leído
        b1.read = true;

        lista.updateCounts();

        expect(lista.read).toBe(1);
        expect(lista.noRead).toBe(2);
    });


    test("finishCurrentBook debe actualizar correctamente el estado de lectura", () => {
        const lista = new BookList();

        const b1 = new Book("Libro1", "Terror", "Autor1");
        const b2 = new Book("Libro2", "Drama", "Autor2");
        const b3 = new Book("Libro3", "Sci-fi", "Autor3");

        lista.addBook(b1);
        lista.addBook(b2);
        lista.addBook(b3);

        // Ejecutamos finishCurrentBook
        lista.finishCurrentBook();

        // b1 ahora debe estar leído
        expect(b1.read).toBe(true);
        expect(typeof b1.date).toBe("object");

        // El último leído debe ser b1
        expect(lista.lBook).toBe(b1);

        // El actual debe ser b2
        expect(lista.cBook).toBe(b2);

        // El siguiente debe ser b3
        expect(lista.nBook).toBe(b3);
    });

});
