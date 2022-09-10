const dummy = [
    {
        journalId: '36498451',
        dop: '16 January, 2020',
        authorId: 'ATH89416699459',
        content: 'This is a smaple journal for tesing.',
        image: 'Image File',
        likes: [],
        dislikes: []
    },
    {
        journalId: '36498451',
        dop: '!8 March, 2019',
        authorId: 'ATH89416684559',
        content: 'This is the second journal for tesing.',
        image: 'Image File',
        likes: [],
        dislikes: []
    }
]

const resolvers = {
    Query: {
        journals: () => dummy
    }
}

module.exports = resolvers;