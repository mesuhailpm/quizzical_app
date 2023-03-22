function getQuestions(number) {
    const apiUrl= `https://opentdb.com/api.php?amount=${number}&category=9&difficulty=easy&type=multiple`

    return fetch(apiUrl)
		.then(res => res.json())
		.then(info => info.results);
}
export default getQuestions;
