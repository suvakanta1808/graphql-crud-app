const { Journal } = require('../models/journal');

const resolvers = {
    Query: {
        journals: async (_, {}) => {
            return await Journal.find();
        }
    },
    Mutation: {
        createJournal: async (_, {input: {content}}, {models}) => {
            var journal = new Journal({
                authorId: "ATH1234567",
                content: content,
                dop: new Date().toISOString(),
                dislikes: [],
                likes: []
            });
            await journal.save();
            return journal;
        }
    }
}

module.exports = resolvers;