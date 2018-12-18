import createHistory from 'history/createBrowserHistory';

export default createHistory({
    basename: "/html/hybrid",
    // forceRefresh: false, // Set true to force full page refreshes
    // keyLength: 6, // The length of location.key
    // // A function to use to confirm navigation with the user (see below)
    // getUserConfirmation: (message, callback) => callback(window.confirm(message))
});