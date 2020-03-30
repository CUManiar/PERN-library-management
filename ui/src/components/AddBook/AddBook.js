import React, { Component } from 'react';

class AddBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book_name: '',
            author: 'N/A',
            pages: 0,
            publication: 'N/A',
            book_count: 1
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = () => {
        const book = {
            name: this.state.book_name,
            author: this.state.author,
            pages: this.state.pages,
            publication: this.state.publication,
            bookCount: this.state.book_count
        };
        fetch('http://localhost:8000/api/admin/add_book', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Book added to library! Hurrrey ... Keep adding more and more!!!!');
                    this.props.onRouteChange('list-all-books');
                } else {
                    alert('Something went wrong! Book couldn\'t be added to library!');
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <main className="pa4 black-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Add Book</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="book_name">Book Name<span className="dark-red">*</span></label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="book_name" id="book_name" onChange={this.handleInputChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="author">Author</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="author" id="author" onChange={this.handleInputChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="pages">Pages</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="number" name="pages" id="pages" onChange={this.handleInputChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="publication">Publication</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="publication" id="publication" onChange={this.handleInputChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="book_count">Pieces Available (Default - 1)</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="number" name="book_count" id="book_count" onChange={this.handleInputChange} value={this.state.book_count} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Submit" onClick={this.onSubmit} />
                    </div>
                </form>
            </main>

        )
    }
}


export default AddBook;