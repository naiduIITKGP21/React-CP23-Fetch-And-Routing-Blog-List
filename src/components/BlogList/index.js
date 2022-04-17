// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const updatedData = data.map(eachObject => ({
      id: eachObject.id,
      title: eachObject.title,
      imageUrl: eachObject.image_url,
      avatarUrl: eachObject.avatar_url,
      author: eachObject.author,
      topic: eachObject.topic,
    }))
    console.log(updatedData)
    this.setState({
      blogsData: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blogs-list-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachObject => (
              <BlogItem key={eachObject.id} blogsData={eachObject} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
