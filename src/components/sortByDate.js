export default function sortByDate(commentList){
    const result = commentList;
    result.sort(function(a,b){return new Date(a.snippet.topLevelComment.snippet.publishedAt) - new Date(b.snippet.topLevelComment.snippet.publishedAt)} );
    return result;  



}