const db = require('../Firebase')


exports.getAllNews = async (req, res) => {
    try {
        const newsRef = db.db.collection('news');
        const snapshot = await newsRef.get();
        const news = [];

        snapshot.forEach((doc) => {
            news.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            message: 'Get all news',
            data: news
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsRef = db.db.collection('news').doc(id);
        const doc = await newsRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'News not found' });
        } else {
            res.status(200).json({
                message: 'Get news by id',
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newsRef = db.db.collection('news');
        const doc = await newsRef.add({ title, content });

        res.status(201).json({
            message: 'News created successfully',
            data: {
                id: doc.id,
                title,
                content
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const newsRef = db.db.collection('news').doc(id);
        const doc = await newsRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'News not found' });
        } else {
            await newsRef.update({ title, content });

            res.status(200).json({
                message: 'News updated successfully',
                data: {
                    id: doc.id,
                    title,
                    content
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const newsRef = db.db.collection('news').doc(id);
        const doc = await newsRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'News not found' });
        } else {
            await newsRef.delete();

            res.status(200).json({
                message: 'News deleted successfully',
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


