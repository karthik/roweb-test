---
title: bold tutorial
package_version: 0.5.0
---



`bold` is an R package to connect to [BOLD Systems](http://www.boldsystems.org/) via their API. Functions in `bold` let you search for sequence data, specimen data, sequence + specimen data, and download raw trace files.

__`bold` info__

+ [BOLD home page](http://boldsystems.org/)
+ [BOLD API docs](http://v4.boldsystems.org/index.php/api_home)


### Installation

You can install the stable version from CRAN



```r
install.packages("bold")
```

Or the development version from Github



```r
install.packages("devtools")
devtools::install_github("ropensci/bold")
```

Then load the package into the R sesssion



```r
library("bold")
```


### Usage

#### Search for taxonomic names via names

`bold_tax_name` searches for names with names.


```r
bold_tax_name(name = 'Diplura')
#>    taxid   taxon tax_rank tax_division parentid       parentname
#> 1 603673 Diplura    genus     Protists    53974 Scytosiphonaceae
#> 2 734358 Diplura    class      Animals       20       Arthropoda
#>   specimenrecords taxonrep     representitive_image.image
#> 1               6     <NA>                           <NA>
#> 2             204  Diplura GBARA/GBOL14725+1435775798.jpg
#>   representitive_image.apectratio   input
#> 1                              NA Diplura
#> 2                           2.219 Diplura
```


```r
bold_tax_name(name = c('Diplura', 'Osmia'))
#>    taxid   taxon tax_rank tax_division parentid       parentname
#> 1 603673 Diplura    genus     Protists    53974 Scytosiphonaceae
#> 2 734358 Diplura    class      Animals       20       Arthropoda
#> 3   4940   Osmia    genus      Animals     4962     Megachilinae
#>   specimenrecords taxonrep     representitive_image.image
#> 1               6     <NA>                           <NA>
#> 2             204  Diplura GBARA/GBOL14725+1435775798.jpg
#> 3            2172    Osmia              BUSA/IMG_3061.jpg
#>   representitive_image.apectratio   input
#> 1                              NA Diplura
#> 2                           2.219 Diplura
#> 3                           1.486   Osmia
```


#### Search for taxonomic names via BOLD identifiers

`bold_tax_id` searches for names with BOLD identifiers.


```r
bold_tax_id(id = 88899)
#>   input taxid   taxon tax_rank tax_division parentid parentname
#> 1 88899 88899 Momotus    genus      Animals    88898  Momotidae
```


```r
bold_tax_id(id = c(88899, 125295))
#>    input  taxid      taxon tax_rank tax_division parentid  parentname
#> 1  88899  88899    Momotus    genus      Animals    88898   Momotidae
#> 2 125295 125295 Helianthus    genus       Plants   151101 Asteroideae
#>     taxonrep
#> 1       <NA>
#> 2 Helianthus
```


#### Search for sequence data only

The BOLD sequence API gives back sequence data, with a bit of metadata.

The default is to get a list back


```r
bold_seq(taxon = 'Coelioxys')[1:2]
#> [[1]]
#> [[1]]$id
#> [1] "BBHYL404-10"
#> 
#> [[1]]$name
#> [1] "Coelioxys rufitarsis"
#> 
#> [[1]]$gene
#> [1] "BBHYL404-10"
#> 
#> [[1]]$sequence
#> [1] "TATAATATATATAATTTTTGCAATATGATCAGGTATAATTGGATCATCTTTAAGAATAATTATTCGAATAGAATTAAGAATCCCAGGTTCATGAATTAGAAATGATCAAATTTATAATTCTTTTATTACAGCACATGCATTTTTAATAATTTTTTTTTTAGTTATGCCTTTTCTAATTGGGGGATTTGGTAATTGATTAACACCATTAATACTTGGAGCTCCTGATATAGCTTTCCCCCGAATAAACAATATTAGATTTTGACTACTCCCACCTTCTTTATTACTTTTATTATCAAGAAATTTAATTAATCCAAGACCAGGAACAGGATGAACTGTTTATCCACCATTATCCTCTTATACATATCATCCATCTCCTTCTGTAGATTTAGCAATTTTTTCTTTACATTTATCAGGAATTTCCTCAATTATTGGATCAATAAATTTTATTGTTACAATTTTAATAATAAAAAATTATTCAATAAATTATAATCAAATACCATTATTCCCATGATCAGTTTTAATTACTACAATTTTATTATTACTATCACTTCCAGTATTAGCAGGAGCAATTACAATATTATTATTTGATCGAAATTTAAATTCTTCTTTTTTTGACCCAATAGGAGGAGGAGACCCAATTTTATATCAACATTTATTT\r"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "BCT004-06"
#> 
#> [[2]]$name
#> [1] "Coelioxys modesta"
#> 
#> [[2]]$gene
#> [1] "BCT004-06"
#> 
#> [[2]]$sequence
#> [1] "-ATATTATATATAATTTTTGCAATATGATCAGGTATAATTGGATCATCTTTAAGAATAATTATTCGCATAGAATTAAGAATCCCAGGTTCTTGAATTAACAATGATCAAATTTATAATTCTTTTATTACAGCTCATGCCTTTTTAATAATTTTTTTCCTAGTGATACCCTTTTTAATTGGTGGATTTGGTAATTGATTAGTACCCTTAATAATTGGAGCTCCAGATATAGCCTTTCCACGAATAAATAATATTAGATTTTGACTTTTACCCCCTTCTTTATTACTTTTATTATCAAGAAATTTAATTAATCCTAGACCTGGTACCGGATGAACAGTTTACCCACCTTTATCTTTATATAATTTTCATCCTTCTCCTTCAGTTGATTTAGCTATTTTTTCATTACATTTATCTGGAATTTCATCTATTATTGGATCAATAAATTTTATTGTTACTATTTTAATAATAAAAAATTTTTCATTAAATTATAGACAAATACCTTTATTTCCATGATCAGTTATAATTACTACAATCTTATTATTATTATCTTTACCAGTATTAGCAGGAGCAATCACAATATTATTATTTGATCGAAATTTTAATTCTTCATTTTTTGACCCTATAGGAGGAGGAGACCCAATTTTATATCAACACTTATTT\r"
```

You can optionally get back the `httr` response object


```r
res <- bold_seq(taxon = 'Coelioxys', response = TRUE)
res$headers
#> NULL
```

You can do geographic searches


```r
bold_seq(geo = "USA")
#> [[1]]
#> [[1]]$id
#> [1] "GBAN1777-08"
#> 
#> [[1]]$name
#> [1] "Macrobdella decora"
#> 
#> [[1]]$gene
#> [1] "GBAN1777-08"
#> 
#> [[1]]$sequence
#> [1] "---------------------------------ATTGGAATCTTGTATTTCTTATTAGGTACATGATCTGCTATAGTAGGGACCTCTATA---AGAATAATTATTCGAATTGAATTAGCTCAACCTGGGTCGTTTTTAGGAAAT---GATCAAATTTACAATACTATTGTTACTGCTCATGGATTAATTATAATTTTTTTTATAGTAATACCTATTTTAATTGGAGGGTTTGGTAATTGATTAATTCCGCTAATA---ATTGGTTCTCCTGATATAGCTTTTCCACGTCTTAATAATTTAAGATTTTGATTACTTCCGCCATCTTTAACTATACTTTTTTGTTCATCTATAGTCGAAAATGGAGTAGGTACTGGATGGACTATTTACCCTCCTTTAGCAGATAACATTGCTCATTCTGGACCTTCTGTAGATATA---GCAATTTTTTCACTTCATTTAGCTGGTGCTTCTTCTATTTTAGGTTCATTAAATTTTATTACTACTGTAGTTAATATACGATGACCAGGGATATCTATAGAGCGAATTCCTTTATTTATTTGATCCGTAATTATTACTACTGTATTGCTATTATTATCTTTACCAGTATTAGCAGCT---GCTATTTCAATATTATTAACAGATCGTAACTTAAATACTAGATTTTTTGACCCAATAGGAGGAGGGGATCCTATTTTATTCCAACATTTATTTTGATTTTTTGGCCACCCTGAAGTTTATATTTTAATTTTACCAGGATTTGGAGCTATTTCTCATGTAGTAAGTCATAACTCT---AAAAAATTAGAACCGTTTGGATCATTAGGGATATTATATGCAATAATTGGAATTGCAATTTTAGGTTTTATTGTTTGAGCACATCATATATTTACAGTAGGTCTTGATGTAGATACACGAGCTTATTTTACAGCAGCTACAATAGTTATTGCTGTTCCTACAGGAATTAAAGTATTTAGGTGATTG---GCAACT\r"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "GBAN1780-08"
#> 
#> [[2]]$name
#> [1] "Haemopis terrestris"
#> 
#> [[2]]$gene
#> [1] "GBAN1780-08"
#> 
#> [[2]]$sequence
#> [1] "---------------------------------ATTGGAACWTTWTATTTTATTTTNGGNGCTTGATCTGCTATATTNGGGATCTCAATA---AGGAATATTATTCGAATTGAGCCATCTCAACCTGGGAGATTATTAGGAAAT---GATCAATTATATAATTCATTAGTAACAGCTCATGGATTAATTATAATTTTCTTTATGGTTATGCCTATTTTGATTGGTGGGTTTGGTAATTGATTACTACCTTTAATA---ATTGGAGCCCCTGATATAGCTTTTCCTCGATTAAATAATTTAAGTTTTTGATTATTACCACCTTCATTAATTATATTGTTAAGATCCTCTATTATTGAAAGAGGGGTAGGTACAGGTTGAACCTTATATCCTCCTTTAGCAGATAGATTATTTCATTCAGGTCCATCGGTAGATATA---GCTATTTTTTCATTACATATAGCTGGAGCATCATCTATTTTAGGCTCATTAAACTTTATTTCTACAATTATTAATATACGAATTAAAGGTATAAGATCTGATCGAGTACCTTTATTTGTATGATCAGTTGTTATTACAACAGTTCTGTTATTATTGTCTTTACCTGTTTTAGCTGCA---GCTATTACTATATTATTAACAGATCGTAATTTAAATACTACTTTTTTTGATCCTATAGGAGGTGGAGATCCAGTATTGTTTCAACACTTATTTTGATTTTTTGGTCATCCAGAAGTATATATTTTGATTTTACCAGGATTTGGAGCAATTTCTCATATTATTACAAATAATTCT---AAAAAATTGGAACCTTTTGGATCTCTTGGTATAATTTATGCTATAATTGGAATTGCAGTTTTAGGGTTTATTGTATGAGCCCATCATATATTTACTGTAGGATTAGATGTTGATACTCGAGCTTATTTTACAGCAGCTACTATAGTTATTGCTGTTCCTACTGGTATTAAAGTTTTTAGGTGATTA---GCAACA\r"
#> 
#> 
#> [[3]]
#> [[3]]$id
#> [1] "GBNM0293-06"
#> 
#> [[3]]$name
#> [1] "Steinernema carpocapsae"
#> 
#> [[3]]$gene
#> [1] "GBNM0293-06"
#> 
#> [[3]]$sequence
#> [1] "---------------------------------------------------------------------------------ACAAGATTATCTCTTATTATTCGTTTAGAGTTGGCTCAACCTGGTCTTCTTTTGGGTAAT---GGTCAATTATATAATTCTATTATTACTGCTCATGCTATTCTTATAATTTTTTTCATAGTTATACCTAGAATAATTGGTGGTTTTGGTAATTGAATATTACCTTTAATATTGGGGGCTCCTGATATAAGTTTTCCACGTTTGAATAATTTAAGTTTTTGATTGCTACCAACTGCTATATTTTTGATTTTAGATTCTTGTTTTGTTGACACTGGTTGTGGTACTAGTTGAACTGTTTATCCTCCTTTGAGG---ACTTTAGGTCACCCTGGYAGAAGTGTAGATTTAGCTATTTTTAGTCTTCATTGTGCAGGAATTAGCTCAATTTTAGGGGCTATTAATTTTATATGTACTACAAAAAATCTTCGTAGTAGTTCTATTTCTTTGGAACATATAAGACTTTTTGTTTGGGCTGTTTTTGTTACTGTTTTTTTATTAGTTTTATCTTTACCTGTTTTAGCTGGTGCTATTACTATGCTTTTAACAGACCGTAATTTAAATACTTCTTTTTTT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\r"
#> 
#> 
#> [[4]]
#> [[4]]$id
#> [1] "NEONV108-11"
#> 
#> [[4]]$name
#> [1] "Aedes thelcter"
#> 
#> [[4]]$gene
#> [1] "NEONV108-11"
#> 
#> [[4]]$sequence
#> [1] "AACTTTATACTTCATCTTCGGAGTTTGATCAGGAATAGTTGGTACATCATTAAGAATTTTAATTCGTGCTGAATTAAGTCAACCAGGTATATTTATTGGAAATGACCAAATTTATAATGTAATTGTTACAGCTCATGCTTTTATTATAATTTTCTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGACTAGTTCCTCTAATATTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAATAATATAAGTTTTTGAATACTACCTCCCTCATTAACTCTTCTACTTTCAAGTAGTATAGTAGAAAATGGATCAGGAACAGGATGAACAGTTTATCCACCTCTTTCATCTGGAACTGCTCATGCAGGAGCCTCTGTTGATTTAACTATTTTTTCTCTTCATTTAGCCGGAGTTTCATCAATTTTAGGGGCTGTAAATTTTATTACTACTGTAATTAATATACGATCTGCAGGAATTACTCTTGATCGACTACCTTTATTCGTTTGATCTGTAGTAATTACAGCTGTTTTATTACTTCTTTCACTTCCTGTATTAGCTGGAGCTATTACAATACTATTAACTGATCGAAATTTAAATACATCTTTCTTTGATCCAATTGGAGGAGGAGACCCAATTTTATACCAACATTTATTT\r"
#> 
#> 
#> [[5]]
#> [[5]]$id
#> [1] "NEONV109-11"
#> 
#> [[5]]$name
#> [1] "Aedes thelcter"
#> 
#> [[5]]$gene
#> [1] "NEONV109-11"
#> 
#> [[5]]$sequence
#> [1] "AACTTTATACTTCATCTTCGGAGTTTGATCAGGAATAGTTGGTACATCATTAAGAATTTTAATTCGTGCTGAATTAAGTCAACCAGGTATATTTATTGGAAATGACCAAATTTATAATGTAATTGTTACAGCTCATGCTTTTATTATAATTTTCTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGACTAGTTCCTCTAATATTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAATAATATAAGTTTTTGAATACTACCTCCCTCATTAACTCTTCTACTTTCAAGTAGTATAGTAGAAAATGGGTCAGGAACAGGATGAACAGTTTATCCACCTCTTTCATCTGGAACTGCTCATGCAGGAGCCTCTGTTGATTTAACTATTTTTTCTCTTCATTTAGCCGGAGTTTCATCAATTTTAGGGGCTGTAAATTTTATTACTACTGTAATTAATATACGATCTGCAGGAATTACTCTTGATCGACTACCTTTATTCGTTTGATCTGTAGTAATTACAGCTGTTTTATTACTTCTTTCACTTCCTGTATTAGCTGGAGCTATTACAATACTATTAACTGATCGAAATTTAAATACATCTTTCTTTGACCCAATTGGAGGGGGAGACCCAATTTTATACCAACATTTATTT\r"
```

And you can search by researcher name


```r
bold_seq(researchers = 'Thibaud Decaens')[[1]]
#> $id
#> [1] "ECHUB386-11"
#> 
#> $name
#> [1] "Haplotaxida"
#> 
#> $gene
#> [1] "ECHUB386-11"
#> 
#> $sequence
#> [1] "AACTCTATACTTTATTTTAGGGGTATGAGCAGGAATAATTGGAGCGGGAATAAGACTCCTAATCCGAATTGAACTAAGACAGCCTGGGGCATTCCTAGGAAGAGATCAATTATATAACACCATTGTTACTGCACATGCATTCCTAATAATCTTCTTCTTGGTAATACCAGTATTTATTGGAGGGTTCGGAAACTGACTCCTACCTCTAATACTGGGTGCGCCCGACATAGCATTTCCACGACTAAACAACATAAGATTTTGACTTCTACCACCATCACTAATTCTTTTAATCTCATCTGCCGCCGTAGAAAAAGGAGCGGGGACAGGATGAACTGTCTATCCCCCGTTAGCAAGAAACATAGCCCACGCAGGTCCATCAGTAGATCTGGCAATTTTCTCACTACATTTAGCCGGAGCCTCATCAATTCTAGGGGCAATTAATTTTATCACCACAGTGGTAAATATACGATGAAGAGGTTTGAAACTGGAACGAGTATCACTTTTCGTGTGAGCGGTAATAATCACAGTAGTATTACTACTACTCTCACTTCCAGTTCTTGCTGGTGCCATTACCATACTATTAACTGACCGAAACCTTAATACATCATTCTTCGACCCCGCAGGAGGCGGAGATCCGATCCTTTATCAACACCTATTC\r"
```

by taxon IDs


```r
bold_seq(ids = c('ACRJP618-11', 'ACRJP619-11'))
#> [[1]]
#> [[1]]$id
#> [1] "ACRJP618-11"
#> 
#> [[1]]$name
#> [1] "Lepidoptera"
#> 
#> [[1]]$gene
#> [1] "ACRJP618-11"
#> 
#> [[1]]$sequence
#> [1] "------------------------TTGAGCAGGCATAGTAGGAACTTCTCTTAGTCTTATTATTCGAACAGAATTAGGAAATCCAGGATTTTTAATTGGAGATGATCAAATCTACAATACTATTGTTACGGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGTAATTGATTAGTTCCCCTTATACTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAACAATATAAGTTTTTGGCTTCTTCCCCCTTCACTATTACTTTTAATTTCCAGAAGAATTGTTGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCACTGTCATCTAATATTGCCCATAGAGGTACATCAGTAGATTTAGCTATTTTTTCTTTACATTTAGCAGGTATTTCCTCTATTTTAGGAGCGATTAATTTTATTACTACAATTATTAATATACGAATTAACAGTATAAATTATGATCAAATACCACTATTTGTGTGATCAGTAGGAATTACTGCTTTACTCTTATTACTTTCTCTTCCAGTATTAGCAGGTGCTATCACTATATTATTAACGGATCGAAATTTAAATACATCATTTTTTGATCCTGCAGGAGGAGGAGATCCAATTTTATATCAACATTTATTT\r"
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "ACRJP619-11"
#> 
#> [[2]]$name
#> [1] "Lepidoptera"
#> 
#> [[2]]$gene
#> [1] "ACRJP619-11"
#> 
#> [[2]]$sequence
#> [1] "AACTTTATATTTTATTTTTGGTATTTGAGCAGGCATAGTAGGAACTTCTCTTAGTCTTATTATTCGAACAGAATTAGGAAATCCAGGATTTTTAATTGGAGATGATCAAATCTACAATACTATTGTTACGGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGTAATTGATTAGTTCCCCTTATACTAGGAGCCCCAGATATAGCTTTCCCTCGAATAAACAATATAAGTTTTTGGCTTCTTCCCCCTTCACTATTACTTTTAATTTCCAGAAGAATTGTTGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCACTGTCATCTAATATTGCCCATAGAGGTACATCAGTAGATTTAGCTATTTTTTCTTTACATTTAGCAGGTATTTCCTCTATTTTAGGAGCGATTAATTTTATTACTACAATTATTAATATACGAATTAACAGTATAAATTATGATCAAATACCACTATTTGTGTGATCAGTAGGAATTACTGCTTTACTCTTATTACTTTCTCTTCCAGTATTAGCAGGTGCTATCACTATATTATTAACGGATCGAAATTTAAATACATCATTTTTTGATCCTGCAGGAGGAGGAGATCCAATTTTATATCAACATTTATTT\r"
```

by container (containers include project codes and dataset codes)


```r
bold_seq(container = 'ACRJP')[[1]]
#> $id
#> [1] "ACRJP003-09"
#> 
#> $name
#> [1] "Lepidoptera"
#> 
#> $gene
#> [1] "ACRJP003-09"
#> 
#> $sequence
#> [1] "AACATTATATTTTATTTTTGGGATCTGATCTGGAATAGTAGGGACATCTTTAAGTATACTAATTCGAATAGAACTAGGAAATCCTGGATGTTTAATTGGGGATGATCAAATTTATAATACTATTGTTACAGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCCATTATAATTGGAGGTTTTGGCAATTGACTTGTACCATTAATATTAGGAGCCCCTGATATAGCATTTCCCCGAATAAATAATATAAGATTTTGACTTCTTCCCCCCTCATTAATTTTATTAATTTCAAGAAGAATTGTTGAAAATGGAGCAGGAACAGGATGAACAGTCTATCCTCCATTATCTTCTAATATTGCGCATAGAGGATCCTCTGTTGATTTAGCTATTTTCTCACTTCATTTAGCAGGAATTTCTTCTATTTTAGGAGCAATTAATTTTATTACAACTATTATTAATATACGAATAAATAATTTACTTTTTGACCAAATACCTCTATTTGTTTGAGCAGTAGGTATTACAGCTGTTCTTCTTTTATTATCATTACCAGTATTAGCAGGAGCAATTACCATACTATTAACAGATCGTAATTTAAATACTTCTTTCTTTGATCCTGCTGGAGGAGGAGATCCAATTTTATACCAACATTTATTT\r"
```

by bin (a bin is a _Barcode Index Number_)


```r
bold_seq(bin = 'BOLD:AAA5125')[[1]]
#> $id
#> [1] "ASARD6776-12"
#> 
#> $name
#> [1] "Lepidoptera"
#> 
#> $gene
#> [1] "ASARD6776-12"
#> 
#> $sequence
#> [1] "AACTTTATATTTTATTTTTGGAATTTGAGCAGGTATAGTAGGAACTTCTTTAAGATTACTAATTCGAGCAGAATTAGGTACCCCCGGATCTTTAATTGGAGATGACCAAATTTATAATACCATTGTAACAGCTCATGCTTTTATTATAATTTTTTTTATAGTTATACCTATTATAATTGGAGGATTTGGAAATTGATTAGTACCCCTAATACTAGGAGCTCCTGATATAGCTTTCCCCCGAATAAATAATATAAGATTTTGACTATTACCCCCATCTTTAACCCTTTTAATTTCTAGAAGAATTGTCGAAAATGGAGCTGGAACTGGATGAACAGTTTATCCCCCCCTTTCATCTAATATTGCTCATGGAGGCTCTTCTGTTGATTTAGCTATTTTTTCCCTTCATCTAGCTGGAATCTCATCAATTTTAGGAGCTATTAATTTTATCACAACAATCATTAATATACGACTAAATAATATAATATTTGACCAAATACCTTTATTTGTATGAGCTGTTGGTATTACAGCATTTCTTTTATTGTTATCTTTACCTGTACTAGCTGGAGCTATTACTATACTTTTAACAGATCGAAACTTAAATACATCATTTTTTGACCCAGCAGGAGGAGGAGATCCTATTCTCTATCAACATTTATTT\r"
```

And there are more ways to query, check out the docs for `?bold_seq`.


#### Search for specimen data only

The BOLD specimen API doesn't give back sequences, only specimen data. By default you download `tsv` format data, which is given back to you as a `data.frame`


```r
res <- bold_specimens(taxon = 'Osmia')
head(res[,1:8])
#>      processid         sampleid recordID       catalognum         fieldnum
#> 1  ASGCB255-13   BIOUG07489-F04  3955532                    BIOUG07489-F04
#> 2 BBHYA3298-12   BIOUG02688-A06  2711807   BIOUG02688-A06  L#11BIOBUS-2558
#> 3  BBHYL310-10     10BBCHY-3264  1769753     10BBCHY-3264   L#PC2010KT-025
#> 4  BBHYL365-10     10BBCHY-3319  1769808     10BBCHY-3319   L#PC2010YO-150
#> 5  BCHYM412-13 BC ZSM HYM 18272  3896353 BC ZSM HYM 18272 BC ZSM HYM 18272
#> 6    BCT023-06       06-BCT-023   240799                        06-BCT-023
#>                                      institution_storing collection_code
#> 1                      Biodiversity Institute of Ontario              NA
#> 2 University of Guelph, Centre for Biodiversity Genomics              NA
#> 3 University of Guelph, Centre for Biodiversity Genomics              NA
#> 4 University of Guelph, Centre for Biodiversity Genomics              NA
#> 5              SNSB, Zoologische Staatssammlung Muenchen              NA
#> 6 University of Guelph, Centre for Biodiversity Genomics              NA
#>        bin_uri
#> 1 BOLD:ABZ2181
#> 2 BOLD:ACF5858
#> 3 BOLD:AAC3295
#> 4 BOLD:AAC8510
#> 5 BOLD:AAP2416
#> 6 BOLD:AAB1785
```

You can optionally get back the data in `XML` format


```r
bold_specimens(taxon = 'Osmia', format = 'xml')
```


```r
<?xml version="1.0" encoding="UTF-8"?>
<bold_records  xsi:noNamespaceSchemaLocation="http://www.boldsystems.org/schemas/BOLDPublic_record.xsd"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <record>
    <record_id>1470124</record_id>
    <processid>BOM1525-10</processid>
    <bin_uri>BOLD:AAN3337</bin_uri>
    <specimen_identifiers>
      <sampleid>DHB 1011</sampleid>
      <catalognum>DHB 1011</catalognum>
      <fieldnum>DHB1011</fieldnum>
      <institution_storing>Marjorie Barrick Museum</institution_storing>
    </specimen_identifiers>
    <taxonomy>
```

You can choose to get the `httr` response object back if you'd rather work with the raw data returned from the BOLD API.


```r
res <- bold_specimens(taxon = 'Osmia', format = 'xml', response = TRUE)
res$url
#> [1] "http://v4.boldsystems.org/index.php/API_Public/specimen?taxon=Osmia&format=xml"
res$status_code
#> [1] 200
res$headers
#> NULL
```

#### Search for specimen plus sequence data

The specimen/sequence combined API gives back specimen and sequence data. Like the specimen API, this one gives by default `tsv` format data, which is given back to you as a `data.frame`. Here, we're setting `sepfasta=TRUE` so that the sequence data is given back as a list, and taken out of the `data.frame` returned so the `data.frame` is more manageable.


```r
res <- bold_seqspec(taxon = 'Osmia', sepfasta = TRUE)
res$fasta[1:2]
#> $`ASGCB255-13`
#> [1] "-------------------------------GGAATAATTGGTTCTGCTATAAGTATTATTATTCGAATAGAATTAAGAATTCCTGGATCATTCATTTCTAATGATCAAACTTATAATTCTTTAGTAACAGCTCATGCTTTTTTAATAATTTTTTTTCTTGTAATACCATTTTTAATTGGTGGATTTGGAAATTGATTAATTCCATTAATATTAGGAATCCCAGATATAGCATTTCCTCGAATAAATAATATTAGATTTTGACTTTTACCCCCATCCTTAATAATTTTACTTTTAAGAAATTTCTTAAATCCAAGTCCAGGAACAGGTTGAACTGTATATCCCCCCCTTTCTTCTTATTTATTTCATTCTTCCCCTTCTGTTGATTTAGCTATTTTTTCTCTTCATATTTCTGGTTTATCTTCCATCATAGGTTCTTTAAATTTTATTGTTACAATTATTATAATAAAAAATATTTCATTAAAACATATTCAATTACCTTTATTTCCTTGATCCGTTTTTATTACAACTATTTTACTATTATTTTCTTTACCTGTTCTAGCAGGAGCTATTACTATATTATTATTTGATCGAAACTTTAATACTTCATTTTTTGATCCAACTGGAGGAGGAGATCCAATTTTATATCAACATTTATTC"
#> 
#> $`BBHYA3298-12`
#> [1] "AATTTTATACATAATTTTTGCTATATGATCAGGAATAATTGGTTCAGCAATAAGTATTATTATTCGTATAGAACTAAGTATTCCTGGTTCATGAATTTCAAATGATCAAACCTATAACTCTTTAGTAACCGCACATGCTTTTTTAATAATTTTTTTTTTAGTAATACCATTTTTAATTGGAGGATTTGGAAATTGATTAGTTCCTTTAATATTAGGAATTCCGGACATAGCTTTTCCACGAATAAATAATATTAGATTTTGACTTTTACCCCCTTCCCTAATAATATTACTTTTAAGAAATTTTCTTAATCCAAGACCTGGAACAGGATGAACTGTATATCCTCCTCTTTCTTCACATTTATTTCATTCTTCTCCTTCAGTTGATATAGCTATTTTTTCTTTACATATTTCTGGTTTATCTTCAATTATAGGATCATTAAATTTTATTGTTACTATTATTATAATAAAAAATATTTCTTTAAAACATATTCAATTACCTTTATTTCCATGATCTGTTTTTATTACTACTATTTTATTACTTTTTTCTTTACCTGTTTTAGCAGGTGCAATTACTATATTATTATTTGATCGAAATTTTAATACTTCATTTTTTGATCCAACAGGAGGAGGAGATCCTATTTTATATCAACATTTATTT"
```

Or you can index to a specific sequence like


```r
res$fasta['GBAH0293-06']
#> $`GBAH0293-06`
#> [1] "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------TTAATGTTAGGGATTCCAGATATAGCTTTTCCACGAATAAATAATATTAGATTTTGACTGTTACCTCCATCTTTAATATTATTACTTTTAAGAAATTTTTTAAATCCAAGTCCTGGAACAGGATGAACAGTTTATCCTCCTTTATCATCAAATTTATTTCATTCTTCTCCTTCAGTTGATTTAGCAATTTTTTCTTTACATATTTCAGGTTTATCTTCTATTATAGGTTCATTAAATTTTATTGTTACAATTATTATAATAAAAAATATTTCTTTAAAATATATTCAATTACCTTTATTTTCTTGATCTGTATTTATTACTACTATTCTTTTATTATTTTCTTTACCTGTATTAGCTGGAGCTATTACTATATTATTATTTGATCGAAATTTTAATACATCTTTTTTTGATCCAACAGGAGGGGGAGATCCAATTCTTTATCAACATTTATTTTGATTTTTTGGTCATCCTGAAGTTTATATTTTAATTTTACCTGGATTTGGATTAATTTCTCAAATTATTTCTAATGAAAGAGGAAAAAAAGAAACTTTTGGAAATATTGGTATAATTTATGCTATATTAAGAATTGGACTTTTAGGTTTTATTGTT---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
```

#### Get trace files

This function downloads files to your machine - it does not load them into your R session - but prints out where the files are for your information.


```r
bold_trace(taxon='Osmia', quiet=TRUE)
#> Downloading: 51 MB
#> <bold trace files>
#>
#> .../bold/bold_trace_files/BBHYL361-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL361-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/BBHYL363-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL363-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/BBHYL365-10[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/BBHYL365-10[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB666-09[LepF1,LepR1]_F.ab1
#> .../bold/bold_trace_files/FBAPB666-09[LepF1,LepR1]_R.ab1
#> .../bold/bold_trace_files/FBAPB667-09[LepF1,LepR1]_R.ab1
```


### Citing

To cite `bold` in publications use:

> Scott Chamberlain (2017). bold: Interface to Bold Systems API. R package version 0.5.0. https://github.com/ropensci/bold

### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for bold](https://github.com/ropensci/bold/issues?state=open)

[Back to top](#top)