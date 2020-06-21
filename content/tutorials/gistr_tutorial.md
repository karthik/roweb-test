---
title: gistr vignette
package_version: 0.4.0
---




### Installation

You can install from CRAN


```r
install.packages("gistr")
```

Or the development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/gistr")
```



```r
library("gistr")
```

### Authentication

There are two ways to authorise gistr to work with your GitHub account:

* Generate a personal access token (PAT) at [https://help.github.com/articles/creating-an-access-token-for-command-line-use](https://help.github.com/articles/creating-an-access-token-for-command-line-use) and record it in the `GITHUB_PAT` envar.
* Interactively login into your GitHub account and authorise with OAuth.

Using the PAT is recommended.

Using the `gist_auth()` function you can authenticate seperately first, or if you're not authenticated, this function will run internally with each functionn call. If you have a PAT, that will be used, if not, OAuth will be used.


```r
gist_auth()
```

### Workflow

In `gistr` you can use pipes, introduced perhaps first in R in the package `magrittr`, to pass outputs from one function to another. If you have used `dplyr` with pipes you can see the difference, and perhaps the utility, of this workflow over the traditional workflow in R. You can use a non-piping or a piping workflow with `gistr`. Examples below use a mix of both workflows. Here is an example of a piping wofklow (with some explanation):


```r
file <- system.file("examples", "stuff.Rmd", package = "gistr")
gists(what = "minepublic")[[1]] %>% # List my public gists, and index 1st
  add_files(file) %>% # Add new file to that gist
  update() # update sends a PATCH command to Gists API to add file to your gist
```

And a non-piping workflow that does the same exact thing:


```r
file <- system.file("examples", "example1.md", package = "gistr")
g <- gists(what = "minepublic")[[1]]
g <- add_files(g, file)
update(g)
```

Or you could string them all together in one line (but it's rather difficult to follow what's going on because you have to read from the inside out)


```r
update(add_files(gists(what = "minepublic")[[1]], file))
```

**Rate limit information**


```r
rate_limit()
```

```
#> Rate limit: 5000
#> Remaining:  4958
#> Resets in:  43 minutes
```


**List gists**

Limiting to a few results here to keep it brief


```r
gists(per_page = 2)
```

```
#> [[1]]
#> <gist>8c421b44f6be14d299102d5c84558e15
#>   URL: https://gist.github.com/8c421b44f6be14d299102d5c84558e15
#>   Description: Break on unsatisfiable constraints and send to wtfautolayout
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:47Z / 2017-10-17T01:25:48Z
#>   Files: .lldbinit, break_unsatisfiable.py
#>   Truncated?: FALSE, FALSE
#> 
#> [[2]]
#> <gist>db12d6afe01568f7348c2d4d96bf3ef8
#>   URL: https://gist.github.com/db12d6afe01568f7348c2d4d96bf3ef8
#>   Description: Dockerized SQL Server
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:45Z / 2017-10-17T01:25:45Z
#>   Files: sql-docker.sh
#>   Truncated?: FALSE
```

Since a certain date/time


```r
gists(since = '2014-05-26T00:00:00Z', per_page = 2)
```

```
#> [[1]]
#> <gist>8c421b44f6be14d299102d5c84558e15
#>   URL: https://gist.github.com/8c421b44f6be14d299102d5c84558e15
#>   Description: Break on unsatisfiable constraints and send to wtfautolayout
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:47Z / 2017-10-17T01:25:48Z
#>   Files: .lldbinit, break_unsatisfiable.py
#>   Truncated?: FALSE, FALSE
#> 
#> [[2]]
#> <gist>db12d6afe01568f7348c2d4d96bf3ef8
#>   URL: https://gist.github.com/db12d6afe01568f7348c2d4d96bf3ef8
#>   Description: Dockerized SQL Server
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:45Z / 2017-10-17T01:25:45Z
#>   Files: sql-docker.sh
#>   Truncated?: FALSE
```

Request different types of gists, one of public, minepublic, mineall, or starred.


```r
gists('minepublic', per_page = 2)
```

```
#> [[1]]
#> <gist>4d2e89ea344632392bcd20b784dc88d8
#>   URL: https://gist.github.com/4d2e89ea344632392bcd20b784dc88d8
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-16T06:32:52Z / 2017-10-16T06:32:52Z
#>   Files: pleiades304c3d27174e.geojson
#>   Truncated?: FALSE
#> 
#> [[2]]
#> <gist>39d17a26cbc558117fc2dde0f445f155
#>   URL: https://gist.github.com/39d17a26cbc558117fc2dde0f445f155
#>   Description: gist gist gist
#>   Public: TRUE
#>   Created/Edited: 2017-10-16T05:58:14Z / 2017-10-16T05:58:15Z
#>   Files: stuff.md, zoo.json
#>   Truncated?: FALSE, FALSE
```


**List a single gist**


```r
gist(id = 'f1403260eb92f5dfa7e1')
```

```
#> <gist>f1403260eb92f5dfa7e1
#>   URL: https://gist.github.com/f1403260eb92f5dfa7e1
#>   Description: Querying bitly from R 
#>   Public: TRUE
#>   Created/Edited: 2014-10-15T20:40:12Z / 2015-08-29T14:07:43Z
#>   Files: bitly_r.md
#>   Truncated?: FALSE
```

**Create gist**

You can pass in files

First, get a file to work with


```r
stuffpath <- system.file("examples", "stuff.md", package = "gistr")
```


```r
gist_create(files = stuffpath, description = 'a new cool gist')
```


```r
gist_create(files = stuffpath, description = 'a new cool gist', browse = FALSE)
```

```
#> <gist>db689b9cbdb0dcbb08576449f04047cb
#>   URL: https://gist.github.com/db689b9cbdb0dcbb08576449f04047cb
#>   Description: a new cool gist
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:57Z / 2017-10-17T01:25:57Z
#>   Files: stuff.md
#>   Truncated?: FALSE
```

Or, wrap `gist_create()` around some code in your R session/IDE, like so, with just the function name, and a `{'` at the start and a `'}` at the end.


```r
gist_create(code = {'
x <- letters
numbers <- runif(8)
numbers

[1] 0.3229318 0.5933054 0.7778408 0.3898947 0.1309717 0.7501378 0.3206379 0.3379005
'}, browse = FALSE)
```

```
#> <gist>cd0a9dd3e163f48f50164efafcb794b3
#>   URL: https://gist.github.com/cd0a9dd3e163f48f50164efafcb794b3
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:58Z / 2017-10-17T01:25:58Z
#>   Files: code.R
#>   Truncated?: FALSE
```

You can also knit an input file before posting as a gist:


```r
file <- system.file("examples", "stuff.Rmd", package = "gistr")
gist_create(file, description = 'a new cool gist', knit = TRUE)
#> <gist>4162b9c53479fbc298db
#>   URL: https://gist.github.com/4162b9c53479fbc298db
#>   Description: a new cool gist
#>   Public: TRUE
#>   Created/Edited: 2014-10-27T16:07:31Z / 2014-10-27T16:07:31Z
#>   Files: stuff.md
```

Or code blocks before (note that code blocks without knitr block demarcations will result in unexecuted code):


```r
gist_create(code = {'
x <- letters
(numbers <- runif(8))
'}, knit = TRUE)
#> <gist>ec45c396dee4aa492139
#>   URL: https://gist.github.com/ec45c396dee4aa492139
#>   Description:
#>   Public: TRUE
#>   Created/Edited: 2014-10-27T16:09:09Z / 2014-10-27T16:09:09Z
#>   Files: file81720d1ceff.md
```

**knit code from file path, code block, or gist file**

knit a local file


```r
file <- system.file("examples", "stuff.Rmd", package = "gistr")
run(file, knitopts = list(quiet = TRUE)) %>% gist_create(browse = FALSE)
```

```
#> <gist>ddb81aee4a0d081568da0c742446d7c9
#>   URL: https://gist.github.com/ddb81aee4a0d081568da0c742446d7c9
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:26:00Z / 2017-10-17T01:26:00Z
#>   Files: stuff.md
#>   Truncated?: FALSE
```



knit a code block (`knitr` code block notation missing, do add that in) (result not shown)


```r
run({'
x <- letters
(numbers <- runif(8))
'}) %>% gist_create()
```

knit a file from a gist, has to get file first (result not shown)


```r
gists('minepublic')[[1]] %>% run() %>% update()
```

**List commits on a gist**


```r
gists()[[1]] %>% commits()
```

```
#> [[1]]
#> <commit>
#>   Version: a47b69d043bb4beb979d100e4c0407f737ad180d
#>   User: sckott
#>   Commited: 2017-10-17T01:25:57Z
#>   Commits [total, additions, deletions]: [5,5,0]
```

**Star a gist**

Star


```r
gist('485d4edfb1e1912bb9f4') %>% star()
```

```
#> <gist>485d4edfb1e1912bb9f4
#>   URL: https://gist.github.com/485d4edfb1e1912bb9f4
#>   Description: rentrez release blog post
#>   Public: TRUE
#>   Created/Edited: 2015-09-23T02:26:19Z / 2015-12-29T18:08:27Z
#>   Files: rentrez_1.Rmd, rentrez_1.md
#>   Truncated?: FALSE, FALSE
```

Unstar


```r
gist('485d4edfb1e1912bb9f4') %>% unstar()
```

```
#> <gist>485d4edfb1e1912bb9f4
#>   URL: https://gist.github.com/485d4edfb1e1912bb9f4
#>   Description: rentrez release blog post
#>   Public: TRUE
#>   Created/Edited: 2015-09-23T02:26:19Z / 2017-10-17T01:26:03Z
#>   Files: rentrez_1.Rmd, rentrez_1.md
#>   Truncated?: FALSE, FALSE
```

**Update a gist**

Add files

First, path to file


```r
file <- system.file("examples", "alm.md", package = "gistr")
```


```r
gists(what = "minepublic")[[1]] %>%
  add_files(file) %>%
  update()
```

```
#> <gist>cd0a9dd3e163f48f50164efafcb794b3
#>   URL: https://gist.github.com/cd0a9dd3e163f48f50164efafcb794b3
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:58Z / 2017-10-17T01:26:04Z
#>   Files: alm.md, code.R
#>   Truncated?: FALSE, FALSE
```

Delete files


```r
gists(what = "minepublic")[[1]] %>%
  delete_files(file) %>%
  update()
```

```
#> <gist>cd0a9dd3e163f48f50164efafcb794b3
#>   URL: https://gist.github.com/cd0a9dd3e163f48f50164efafcb794b3
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:25:58Z / 2017-10-17T01:26:05Z
#>   Files: code.R
#>   Truncated?: FALSE
```

**Open a gist in your default browser**


```r
gists()[[1]] %>% browse()
```

> Opens the gist in your default browser

**Get embed script**


```r
gists()[[1]] %>% embed()
```

```
#> [1] "<script src=\"https://gist.github.com/carllhw/dc8ee3885d8a43b887fce1ae7fe3bb1f.js\"></script>"
```

**List forks**

Returns a list of `gist` objects, just like `gists()`


```r
gist(id = '1642874') %>% forks(per_page = 2)
```

```
#> [[1]]
#> <gist>1642989
#>   URL: https://gist.github.com/1642989
#>   Description: Spline Transition
#>   Public: TRUE
#>   Created/Edited: 2012-01-19T21:45:20Z / 2017-06-29T02:55:47Z
#>   Files: 
#>   Truncated?: 
#> 
#> [[2]]
#> <gist>1643051
#>   URL: https://gist.github.com/1643051
#>   Description: Line Transition (Broken)
#>   Public: TRUE
#>   Created/Edited: 2012-01-19T21:51:30Z / 2016-12-01T07:19:06Z
#>   Files: 
#>   Truncated?:
```

**Fork a gist**

Returns a `gist` object


```r
g <- gists()
(forked <- g[[ sample(seq_along(g), 1) ]] %>% fork())
```

```
#> <gist>31efdee731df890039c49d816ff886aa
#>   URL: https://gist.github.com/31efdee731df890039c49d816ff886aa
#>   Description: 
#>   Public: TRUE
#>   Created/Edited: 2017-10-17T01:26:12Z / 2017-10-17T01:26:12Z
#>   Files: brlog.trunk.20171017-102108
#>   Truncated?: FALSE
```



### Example use case

_Working with the Mapzen Pelias geocoding API_

The API is described at [https://github.com/pelias/pelias](https://github.com/pelias/pelias), and is still in alpha they say. The steps: get data, make a gist. The data is returned from Mapzen as geojson, so all we have to do is literally push it up to GitHub gists and we're done b/c GitHub renders the map.


```r
library('httr')
base <- "http://pelias.mapzen.com/search"
res <- httr::GET(base, query = list(input = 'coffee shop', lat = 45.5, lon = -122.6))
json <- httr::content(res, "text")
gist_create(code = json, filename = "pelias_test.geojson")
#> <gist>017214637bcfeb198070
#>   URL: https://gist.github.com/017214637bcfeb198070
#>   Description:
#>   Public: TRUE
#>   Created/Edited: 2014-10-28T14:42:36Z / 2014-10-28T14:42:36Z
#>   Files: pelias_test.geojson
```

And here's that gist: [https://gist.github.com/sckott/017214637bcfeb198070](https://gist.github.com/sckott/017214637bcfeb198070)

![img](/img/tutorial-images/gistr/gistr_ss.png)



### Citing

> Scott Chamberlain, Ramnath Vaidyanathan and Karthik Ram (2017).
  gistr: Work with 'GitHub' 'Gists'. R package version 0.4.0. https://github.com/ropensci/gistr


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for gistr](https://github.com/ropensci/gistr/issues?state=open)


[Back to top](#top)
