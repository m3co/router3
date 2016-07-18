## Case 1 of routing

### The definition

Let's _H_ to be the window.location.hash

Let's _O_ to be the object-content

Let's _S_ to be the o's attribute hash

By default _O_ is hidden

If _match proccess_ matches _H_ with _S_ then the content of _O_ will _be displayed_.

The definition of _be displayed_ means that
1. if _src_ attribute has a value then let's the content to be _C_ - the result of fetching and processing from the given _url_
2. if _src_ attribute is not present then let's the content to be _C_ - the _O_'s children
3. unhide _O_

