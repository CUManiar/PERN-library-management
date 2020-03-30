import React, { Component } from 'react';

class UpdateBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            selectedBook: {}
        }
    }

    getAllAvailableBooks = () => {
        fetch('http://localhost:8000/api/admin/all_books', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => this.setState({ books: data.data }))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getAllAvailableBooks();
    }

    handleSelectedBook = (e) => {
        const book = this.state.books.filter(book => Number(book.id) === Number(e.target.value));
        this.setState({ selectedBook: book[0] });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ selectedBook: { ...this.state.selectedBook, [name]: value } });
    }

    onUpdate = () => {
        const book = {
            id: this.state.selectedBook.id,
            name: this.state.selectedBook.book_name,
            author: this.state.selectedBook.author,
            pages: this.state.selectedBook.pages,
            publication: this.state.selectedBook.publication,
            bookCount: this.state.selectedBook.book_count
        }
        fetch('http://localhost:8000/api/admin/update_book', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Hey, Book info update successfully!');
                    this.props.onRouteChange('list-all-books');
                }
            })
            .catch(err => {
                alert(`Could not update  ${this.state.selectedBook.book_name}!`)
            })

    }

    render() {
        return (
            <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Update Book</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="selectingBook">Select book to update <span className="dark-red">*</span></label>
                            <select name='books' id='book-select' className="pa2 ma2 bb br3 bg-white ttc" onChange={this.handleSelectedBook}>
                                <option value='null'>Select</option>
                                {
                                    this.state.books.map((item, i) => (
                                        <option className="ttc fw3" value={item['id']} key={i}> {item['book_name']} </option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            this.state.selectedBook.id
                                ?
                                <div className="mt3">
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="book_name">Book Name<span className="dark-red">*</span></label>
                                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ttc" type="text" name="book_name" id="book_name" defaultValue={this.state.selectedBook.book_name} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="author">Author</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ttc" type="text" name="author" id="author" onChange={this.handleInputChange} defaultValue={this.state.selectedBook.author} />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="pages">Pages</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " type="number" name="pages" id="pages" onChange={this.handleInputChange} defaultValue={this.state.selectedBook.pages} />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="publication">Publication</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ttc" type="text" name="publication" id="publication" onChange={this.handleInputChange} defaultValue={this.state.selectedBook.publication} />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="book_count">Pieces Available (Default - 1)</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="number" name="book_count" id="book_count" onChange={this.handleInputChange} defaultValue={this.state.selectedBook.book_count} />
                                    </div>
                                </div>
                                :
                                null
                        }
                    </fieldset>
                    {
                        this.state.selectedBook.id
                            ?
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Update" onClick={this.onUpdate} />
                            </div>
                            :
                            null
                    }

                </form>
            </main>
        )
    }
}


export default UpdateBook;