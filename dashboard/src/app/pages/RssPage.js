import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Snackbar from 'app/helpers/Snackbar';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  updateRssState,
  resetRssState,
  selectRss,
} from 'app/redux/rssSlice';

const useStyles = makeStyles(theme => ({
  input: {
    border: 'none',
    background: '#f5f5f6',
  },
}));

export const RssPage = () => {
  const rssState = useSelector(selectRss);
  const dispatch = useDispatch();
  const [newRss, setNewRss] = useState(rssState);
  const [items, setItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleOnBlur = e => {
    let field = e.target.name;
    let value = e.target.value;
    setNewRss({
      ...newRss,
      [field]: value
    });
    dispatch(updateRssState(newRss));
  };

  const getRss = async () => {
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(newRss.rssUrl)) {
      return;
    }
    const res = await fetch(`https://api.allorigins.win/get?url=${newRss.rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      author: el.querySelector("author").innerHTML
    }));
    setItems(feedItems);
  
  {items.map((item) => {
    return (
      <div>
        <h1>{item.title}</h1>
        <p>{item.author}</p>
        <a href={item.link}>{item.link}</a>
      </div>
    );
  })}
  }

  return (
    <div style={{width: '450px'}} className="d-flex flex-column align-items-center card-body pt-0" >
      <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Rss Name*
        </div>
        <Form>
          <span className="font-weight-bold py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded text-dark px-2 py-1 ${classes.input}` }
              type="text"
              name="rssName"
              required
              value={ newRss.rssName || '' }
              onBlur={ handleOnBlur }
            />
          </span>
        </Form>
      </div>

      <div className="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
        <div className="d-flex flex-column flex-grow-1 mr-2 font-weight-bold text-dark font-size-lg">
          Rss URL*
        </div>
        <Form>
          <span className="font-weight-bold py-1 font-size-lg">
            <TextField
              className={ `font-weight-bold font-size-lg  rounded text-dark px-2 py-1 ${classes.input}` }
              type="text"
              name="rssUrl"
              required
              value={ newRss.rssUrl || '' }
              onBlur={ handleOnBlur }
            />
          </span>
        </Form>
      </div>
    
    <div >
    <Button
            className="btn btn-primary font-weight-bolder font-size-sm"
            onClick={ getRss }>
            Get Feed
          </Button>
    </div>
    </div>
  );
}
