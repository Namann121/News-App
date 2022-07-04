import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalize = (string) => {
        const lower = string.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0
        }
        document.title = `${this.capitalize(this.props.category)}-DailyNews App`
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&
        s&apiKey=cb0d2e2ebddc4cacaabc09cce5301a63&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url); 
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&s&apiKey=cb0d2e2ebddc4cacaabc09cce5301a63&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData= await data.json()
        // this.setState({
        //     articles: parsedData.articles, 
        //     totalResults: parsedData.totalResults,
        //     loading:false
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&s&apiKey=cb0d2e2ebddc4cacaabc09cce5301a63&page=${this.state.page - 1}&pageSize=
        //  ${this.props.pageSize}`;
        //  this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData= await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        this.setState({ page: this.setState.page - 1 })
        this.updateNews();
    }

    handleNextClick = async () => {
        //     if( this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

        //     }
        //     else{
        //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&s&apiKey=cb0d2e2ebddc4cacaabc09cce5301a63&page=${this.state.page + 1}&pageSize=
        //      ${this.props.pageSize}`;
        //      this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData= await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading:false
        //     })
        // }
        this.setState({ page: this.setState.page + 1 })
        this.updateNews();
    }

    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&
        s&apiKey=cb0d2e2ebddc4cacaabc09cce5301a63&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page+1})
        this.setState({ loading: true })
        let data = await fetch(url); 
        let parsedData = await data.json()
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
      };

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop: '65px' }}>DailyNews-Top {this.capitalize(this.props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="row">
                        { this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}


            </div>
        )
    }
}