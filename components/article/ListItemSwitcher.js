import ArticleListItem from "./ListItem";
import React from "react";
import TopList from "./TopList";

function ArticleListItemSwitcher({ item }) {
  if (item.type === "article") {
    return <ArticleListItem {...item.props} />;
  }

  if (item.type === "top") {
    return <TopList {...item.props} />;
  }

  return null;
}

export default ArticleListItemSwitcher;