import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    //função para realizar o submit
    handleSubmit = async e =>{
        //previne atualizar a página
        e.preventDefault();
        
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data)

        this.props.history.push('/');
    }

    //pegando o valor do campo da imagem
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    //usando função js para pegar os dados digitados na tela
    handleChange = e => {
        //só consigo acessar o this se usar o "e" do js e não uma function normal do react
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} />

                <input type="text"
                    name="author"
                    placeholder="Autor do Post"
                    onChange={this.handleChange}
                    value={this.state.author} />

                <input type="text" name="place"
                    placeholder="Local do Post"
                    onChange={this.handleChange}
                    value={this.state.place} />

                <input type="text" name="description"
                    placeholder="Descrição do Post"
                    onChange={this.handleChange}
                    value={this.state.description} />

                <input type="text" name="hashtags"
                    placeholder="Hashtags do Post"
                    onChange={this.handleChange}
                    value={this.state.hashtags} />

                <button type="submit">Enviar</button>
            </form>
        );
    }
};

export default New;