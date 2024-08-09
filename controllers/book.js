import Books from "../model/Book";

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (err) {
        res.json({ success: false, message: "Failed to fetch books", error: err.message });

    }
}