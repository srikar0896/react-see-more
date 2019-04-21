# react-see-more

It's main purpose is to show how many items in the list that are not in the 
viewport

<img src="https://i.imgur.com/bXOnppc.png" alt="drawing" height=450/>


## WIP
##### Dynamic updates
Suppose user is at the end of the list and a new item has been added at the 
beginning of the list and it is not in the viewport then the idea is to show 
something like 
**"1 new item added"** indicating that a new item has been added to the list and 
with a corresponding arrow direction at the corresponding position may be on top or
bottom or sideways,because the list can be dynamically updated and the new item 
can be added at any position and clicking on it should take it to the item 
scroll position, finally which should look something like slack's unread 
mentions sticky thing
![slack](https://get.slack.help/hc/en-us/article_attachments/203675978/blog2.png)

The list item can be added anywhere in a list, that is the item can be 
added in between, at the beginning or at the last and we have to track what 
has been updated and where it has been updated.

###### How can we do that?
2) One way is to create a ref for each child element in the list
and maintain a data structure to track whether the node has been visited/seen
by the user
3) Use "key" keyword to compare snapshots between renders like something 
react does internally to get the diff between

###### Other concerns
1) The scrollable height can also be dynamic, so have to recalculate what's 
in viewport and how many child nodes are not in viewport whenever the 
scrollable container's height alters.
2) What about lazy-loading lists?
3) Will it work as expected with React window?
4) Should we give an option to ignore some elements, suppose in the below 
example, if we don't give an option to ignore some elements, the node "Helper
 text" will also be considered a list items and the text will become "5 More 
 threads" even when there are 4 threads.
```
<div>
  <h2>Conversations</h2>
  <NMore as="ul">
    {
      threads.map(thread => (
        <Thread data={thread} />
      ))
    }
    <HelperText>
      + see all threads
    </HelperText>
  </NMore>
</div>
```
Add "data-nmore-ignore" for ignoring that node and  tell us not to consider that element as a list item
```
<div>
  <h2>Conversations</h2>
  <NMore as="ul">
    {
      threads.map(thread => (
        <Thread data={thread} />
      ))
    }
    <HelperText data-nmore-ignore>
      + see all threads
    </HelperText>
  </NMore>
</div>
```

### Customizability
1) Give an option to **customize the wrapper component**, by default the wrapper of 
list items is "div"

> Should accept component
```
<NMore parentAs={CategoriesWrapper}>
  {
    categories.map(category => (
      <Category data={category} />
    ))
  }
</NMore>
```
> Should accept strings which represent primitive elements
```
<NMore parentAs="ul">
  {
    categories.map(category => (
      <Category data={category} />
    ))
  }
</NMore>
```
2) **Custom Text**(default "N More") => "N more threads"
```
<NMore
  as="ul"
  text={(totalCount, outOfViewPortCount) => `${outOfViewPortCount} More threads` 
>
  {
    categories.map(category => (
      <Category data={category} />
    ))
  }
</NMore>
```
3) **Custom pill**
```
<NMore
  as="ul"
  pill=((totalCount, outOfViewPortCount, iconDirection) => (
    <Pill
      totalChildCount={totalCount}
      outOfViewPortChildCount=(outOfViewPortCount)
      />
    ))
>
  {
    categories.map(category => (
      <Category data={category} />
    ))
  }
</NMore>
``` 

```
## Pill.js

<StyledPill>
  <NavigationIcon direction={iconDirection}/>

  //show text like "4/10" instead of "6 more"
  {(props.totalChildCount - props.outOfViewPortChildCount)/props.totalChildCount}
</StyledPill>
```

#### Good to have feature
1) Right now the floating pill is visible at all the time, somehow that's the point of the handy little component, which is to show how many list items are not view port. But sometimes, seeing this pill, the user might scroll and visited seen all the child elements and scrolled back to top. Now, as he already seent the list items, Do we need to show "n more" or should we just we hide as he already knew it. ? 
Provide a feature to hide the see more button once the user has seen or 
visited all those child nodes in a list
