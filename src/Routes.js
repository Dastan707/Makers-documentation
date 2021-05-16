import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddTopics from './components/AddTopics/AddTopics'
import TopicContextProvider from './contexts/TopicContext';
import TopicList from './components/TopicList/TopicList';
import HomePage from './components/HomePage/HomePage';
import TopicDetails from './components/TopicDetails/TopicDetails';

const Routes = () => {
    return (
        <TopicContextProvider>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/add" component={AddTopics} />
                <Route exact path="/" component={HomePage} />
                <Route exact path='/details/:id' component={TopicDetails} />
            </Switch>
            <Footer />
        </BrowserRouter>
        </TopicContextProvider>
    );
};

export default Routes;