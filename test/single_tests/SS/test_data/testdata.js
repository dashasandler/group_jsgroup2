module.exports = {
    newPublication: {
        title: "JSGroup2 title", description: "Description for WDIO",
        image: "https://testguild.com/wp-content/uploads/2019/07/WebDriverIOBot.jpg",
        content: '11 WebdriverIO is a progressive automation framework built to automate modern web&mobile apps.'
    },
    newPublication2: {
        title: "JSGroup2 title berries",
        description: "Description for berries",
        image: "https://keypennews.org/uploads/original/20210526-151237-21_06-KP-Cooks-berries-ol.jpg",
        content: 'Berries berries berries berries berries berries berries berries berries'
    },
    newPublication3: {
        title: "JSGroup2 title berries + berries =)",
        description: "Description for berries",
        image: "https://keypennews.org/uploads/original/20210526-151237-21_06-KP-Cooks-berries-ol.jpg",
        content: 'Berries2 berries berries1 berries berries4 berries 5berries 7berries berries'
    },

    newProblem: {
        title: "New Problem.Google."+ Math.random(1000),
        company: "Google",
        position: "Quality Assurance Engineer",
        content: "Search the world's information, including webpages, images, videos and more."
    },

    newProblemAPI: {
        title: "New Problem.Google."+ Math.random(1000),
        company: "61d86b716cf96a716c03bcdd",
        position: "Quality Assurance Engineer",
        content: "Search the world's information, including webpages, images, videos and more."
    },

    newUniqueProblemAPI: {
        title: "Colorado river or BBQ jazz",
        company: "61d86b716cf96a716c03bcdd",
        position: "Quality Assurance Engineer",
        content: "Search the world's information, including webpages, images, videos and more."
    },

    dataContainsProblemName:{
        data:["river"," jazz", " BBQ ", "jazz 5 ", "r B", "Colorado river or BBQ jazz 5","Colorado river or BBQ jazz"],
        rowNumber: [5, 5, 5, 0, 5, 1, 5]
    },

    dataEqualsProblemName:{
        data:["Colorado river or BBQ jazz 5", "Colorado"," Colorado river or BBQ jazz 5","Colorado river or BBQ jazz 5 "],
        rowNumber: [1, 0, 0, 0]
    },

    dataStartProblemName:{
        data:["Colorado river or BBQ jazz ", "Colorado"," Colorado river or BBQ jazz 5","river or BBQ jazz 5"],
        rowNumber: [5, 5, 0, 0]
    },

    dataEndProblemName:{
        data:["jazz 1", "Colorado river or BBQ jazz 5","river or BBQ jazz 5", "river or BBQ jazz 5 "],
        rowNumber: [1, 1, 1, 0]
    }
};