import Books from "../model/Book.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Books fetched successfully",
            data: books
        });
    } catch (err) {
        res.json({ 
            success: false, 
            message: "Failed to fetch books", 
            error: err.message 
        });
    }
}

const getById = async(req, res)=>{
    const id = req.params.id
    let book;
    try{
        book = await Books.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.json({
            success: false,
            message: "Book not found",
        });
    }
    return res.json({
        success: true,
        message: "Book found",
        data: book
    })
}

const addbooks = async (req, res) => {
    const { name, author, description, price, image, available,} = req.body;
    let book;
    try {
        book = new Books({
            name,
            author,
            description,
            price,
            image,
            available        
        });
        await book.save();
        return res.json({
            success: true,
            message: "Book added successfully",
            data: book
        })
    } catch (err) {
        console.log(err)

        return res.json({
            success: false,
            message: `Failed to add book - ${err.message}`
        });
    }
}

const updateBook = async(req, res)=>{
    const id = req.params.id;
    const {name, author, description, price, image, available} = req.body;
    let book;
    try{
        book = await Books.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            image,
            available
        });
        book = await book.save()
    }
    catch(err){
        console.log(err)
    }
    if(!book){
        return res.json({
            success: false,
            message: "Unable to update by this id.",
        });
    }
    return res.json({
        success: true,
        message: "Book Updated successfully",
        data: book
    })
}

const deleteBook = async(req, res)=>{
    const id = req.params.id;
    let book;
    try{
        book = await Books.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err)
    }
    if(!book){
        return res.json({
            success: false,
            message: "Unable to delete book by this id.",
        });
    }
    return res.json({
        success: true,
        message: "Book deleted successfully",
    })

}


export { getAllBooks, addbooks, getById, updateBook, deleteBook};