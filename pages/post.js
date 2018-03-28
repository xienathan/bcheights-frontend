import Header from '../components/header/Header';
import Article from '../components/post/Article';
import RelatedArticles from '../components/post/RelatedArticles';
import Footer from "../components/footer/Footer";

import makeStore from "../store";
import * as article from "../actions/articleActions";

import Head from 'next/head';
import React from 'react';
import withRedux from "next-redux-wrapper";
import { connect } from "react-redux";

@connect((store) => {
  return store.article.articleContent;
})
class Post extends React.Component {

  static async getInitialProps({ store, isServer, req, query }) {
    const slug = isServer ? req.params.slug : query.slug;
    return {slug};
  }

  componentWillMount() {
    this.props.dispatch(article.fetchArticle(this.props.slug));
  }

  render() {
    const { title, author, featured, date, content } = this.props

    // Display Header while article content is loading
    if (!content) {
      return (
        <div>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <title>The Heights</title>

            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" /> 
          </Head>
          <div>
            <Header />
          </div>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        </div>
      );
    }

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <title>{title}</title>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" /> 
        </Head>
        <div>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3">
                <Article title={title}
                        author={author}
                      featured={featured}
                          date={date}
                       content={content} />
              </div>
              <div className="col-12 col-md-3">
                <RelatedArticles />
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
      </div>
    );
  }
}

Post = withRedux(makeStore)(Post);

export default Post