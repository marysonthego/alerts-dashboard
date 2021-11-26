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
  addRssfeed,
  updateRssfeed,
  removeRssfeed,
  resetRssfeeds,
  selectRssfeed,
  selectRssfeeds,
} from 'app/redux/rssSlice';

const useStyles = makeStyles(theme => ({
  input: {
    border: 'none',
    background: '#f5f5f6',
  },
}));

export const RssPage = () => {
  const rssfeeds = useSelector(selectRssfeeds);
  const dispatch = useDispatch();
  const [newRss, setNewRss] = useState({
    rssId: "",
    rssName: "",
    rssUrl: "",
  });
  const [newItems, setNewItems] = useState([
    {
      rssid: 0,
      link: "",
      title: "",
      description: ""
    }
  ]);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleOnChange = e => {
    e.preventDefault();
    let field = e.target.name;
    let value = e.target.value;
    setNewRss({
      ...newRss,
      [field]: value
    });
  };

  const GetRssFeed = async () => {
    const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(newRss.rssUrl))
    {
      return;
    }
    const res = await fetch(`https://api.allorigins.win/get?url=${newRss.rssUrl}`);
    console.log(`res: `, res);
    const { contents } = await res.json();
    console.log(`contents: `, contents);
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    console.log(`feed: `, feed);
    const items = feed.querySelectorAll("item");
    console.log(`items: `, items);
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      description: el.querySelector("description").innerHTML
    }));
    setNewItems(feedItems);
    console.log(`feedItems: `, feedItems);
    return (
      <>
        { feedItems.map((item) => (
          <div>
            <h1>{ item.title }Title</h1>
            <p>{ item.description }description</p>
            <a href={ item.link }>{ item.link }link</a>
          </div>
        )) }
      </>
    );
  }

  return (
    <div style={ { width: '450px' } } className="d-flex flex-column align-items-center card-body pt-0" >
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
              focus
              required
              value={ newRss.rssName || '' }
              onChange={ handleOnChange }
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
              onChange={ handleOnChange }
            />
          </span>
        </Form>
      </div>
      <div >
        <Button
          className="btn btn-primary font-weight-bolder font-size-sm"
          onClick={ GetRssFeed }>
          Get Feed
        </Button>
      </div>
    </div>
  );
}
