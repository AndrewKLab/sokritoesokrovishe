export const favorites = {
  mergePostsAndFavorites,
};

function mergePostsAndFavorites(action) {
  var newposts = [];
  for (var i = 0; i < action.posts.length; i++) {
    if (action.favorites !== null && action.favorites.length > 0) {
      var newpost = { ...action.posts[i], favorite: false };
      for (var j = 0; j < action.favorites.length; j++) {
        if (action.favorites[j].ID === action.posts[i].ID) {
          newpost = { ...action.posts[i], favorite: true };
        }
      }
      newposts = [...newposts, newpost];
    } else {
      newposts = [...newposts, { ...action.posts[i], favorite: false }];
    }
  }
  return newposts;
}
