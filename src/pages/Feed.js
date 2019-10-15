import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component{
    //todo componente usando em forma de classe no reactjs precisa
    //o componentDidMount para trabalhar com apis
    //usando estados para verificar as alterações na class, tipo MVVM
    state = {
        feed: [],
    };

    async componentDidMount(){

        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed : response.data });
    }

    registerToSocket = () =>{
        const socket = io('http://localhost:3333');

        //post, like

        socket.on('post', newPost => {
            this.setState({ feed: [ newPost, ...this.state.feed ] });
        })

        socket.on('like', likePost =>{
            this.setState({
                feed: this.state.feed.map( post =>
                    post._id === likePost._id ? likePost : post
                )
            });
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render(){
        return(
            <section id="post-list">
                {
                    this.state.feed.map( post => (
                            <article key={post._id} >
                                <header>
                                    <div className="user-info">
                                        <span>{post.author}</span>
                                        <span className="place">{post.place} </span>
                                    </div>
                                    <img src={more} alt="Mais" />
                                </header>

                                <img src={`http://localhost:3333/files/${post.image}`} alt="Imagem da Postagem" />

                                <footer>
                                    <div className="actions">
                                        {/* passando uma função como referência () => this.handleLike(post._id) */}
                                        <button type="button" onClick={() => this.handleLike(post._id)}>
                                            <img src={like} alt="Gostei" />
                                        </button>
                                        <img src={comment} alt="Comentar" />
                                        <img src={send} alt="Compartilhar" />

                                    </div>
                                    <strong>{post.likes} curtidas</strong>

                                    <p>
                                        {post.description}
                                        <span>{post.hashtags}</span>
                                    </p>
                                </footer>
                        </article>
                    ))
                }
            </section>
        );
    }
}

export default Feed;