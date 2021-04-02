import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";


const Posts = () => {
  //get the data from the redux store using the useSelector.
  const posts = useSelector((state) => state.posts); 

  console.log('posts',posts);

  

  //filter using the hooks state and not using reducer.
  //1. search is the even.target value that is captureed on change.
  //2 we set search using the setSerch Method i.e setSearch(event.target.value) this is equivalent to search.

  
  const [search ,setSearch] = useState("");   
  
  //4.we set the state of the filteresd posts using setFilteredPost 
  //from the useEffect method we set the state to be filteredPosts.
  //then we use the filterdPosts to map the data.

  const [filteredPosts,setFilteredPosts] = useState([]);  
  ///this is for pagination.
  const [offset,setOffset] =  useState(0);
  
  const [perPage] = useState(20);
  const [pageCount,setPageCount] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const loadPosts = async () => {
      await dispatch(fetchPosts());
    };

    loadPosts();


  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.items.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
    setPageCount(Math.ceil(filteredPosts.length/perPage));
  }, [search, posts]);



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

const slice = filteredPosts.slice(offset,offset + perPage);
console.log('sliece',slice);

const postItems = slice.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div> 
    )
    
    ).reverse();
    // setData(postItems)
    // setPageCount(Math.ceil(filteredPosts.length/perPage));
  return (
    <div>
      search
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <hr></hr>
      <h1>Posts</h1>
      {postItems}
      <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
};

export default Posts;
