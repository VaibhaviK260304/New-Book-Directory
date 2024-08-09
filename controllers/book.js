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

const addbooks = async (req, res)=>{
    const {name, author, description, price, available} = req.body;
    let book;
    try{
        book = new Books({
            name,
            author,
            description,
            price,
            available
        });
        await book.save();
    }catch(err){
        console.log(err)
    }

    if(!book){
        return res.json({
            success: false,
            message: "Failed to add book"
        });
    }
    return res.json({
        success: true,
        message: "Book added successfully",
        data: book
    })
}

export {getAllBooks, addbooks};