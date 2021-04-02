import React,{Component,useEffect,useState}  from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import { createPost, searchPost } from '../actions/postActions';

// new implementation using react hooks.

const PostForm = () =>{ 
  const poster = useSelector((state) =>state.posts);
  const [posts, setState] = useState(poster.items);  
  
  const {register,handleSubmit,reset} = useForm(); 
  
  
  const dispatch = useDispatch();

  //submit
  const onSubmit = (data)=>{   

    setState(posts => [...posts,data]); 
    dispatch(createPost(data));
    reset();
  
  }
  //search term using reducers
  const onChange = (event)=>{
    console.log('search',event.target.value);
    let term = event.target.value;
    dispatch(searchPost(term));
  }


  return(
    <div>
    <h1>Add Post</h1>    
    <hr/>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete ="off">
      <div>
        <label>Title: </label>
        <br />
        <input
          type="text"
          name="title"
          ref = {register}         
        />
      </div>
      <br />
      <div>
        <label>Body: </label>
        <br />
        <textarea
          name="body"
          ref = {register}
        />
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
  );

}


export default PostForm;
