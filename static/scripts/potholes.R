getwd()
setwd("C:/Users/cui20/Desktop/potholes")
potholes<-read.csv("potholes.csv",stringsAsFactors = FALSE)
attach(potholes)
head(potholes)
# Data manipulation
# extract month/time
# replace / with - 
potholes1 <- gsub("/","-",potholes$Date)
class(potholes)
# change it to a time variable 
potholes2 <- as.POSIXct(potholes1, format="%m-%d-%Y")
# now the new variable is a time variable 
class(potholes2)
month<-format(potholes2, "%m")
table(month)
su_potholes<-cbind(potholes,month)

head(su_potholes)
month<-summary(su_potholes$month)

#### 1. Barplot.potholes fixed by month,2016

barplot(month,main="Potholes fixed by month, 2016"
        ,xlab="Month",ylab="Number of pothole fixed",ylim=c(0,3000)
        ,col="#cc572e")

####################################################################

# extract hour
head(potholes)
potholes3<-gsub(":","-",potholes$Time)
class(potholes3)
potholes4<-as.POSIXct(potholes3,format="%H-%M")
class(potholes4)
hour<-format(potholes4,"%H")
table(hour)
su_potholes<-cbind(su_potholes,hour)
View(su_potholes)

#### 2.Dot chart.Hour by day of the week of potholes fixed

require(stringi)  # Character String Processing Facilities
require(reshape2) # Flexibly Reshape Data
require(ggplot2)  # An Implementation of the Grammar of Graphics
require(ggthemes) # Extra Themes, Scales and Geoms for ggplot2
require(ggmap)

su_potholes$DayofWeek <- factor(su_potholes$DayofWeek, 
                             levels = c("Monday", "Tuesday",  "Wednesday", "Thursday", 
                                        "Friday", "Saturday", "Sunday"))
su_potholes$Hour<- stri_replace_all_regex(str         = su_potholes$Time,
                                             pattern     = "([0-2][0-9]).*",
                                             replacement = "$1")
su_potholes$Hour <- factor(su_potholes$Hour)

# reduce DayOfWeek and Hour to a table of frequencies
Data  <- dcast(su_potholes, DayofWeek + hour ~ .)
# change columns' names
colnames(Data)<- c("DayOfWeek", "Hour", "Frequency")

# create the chart for hour
g <- ggplot(Data)
g <- g + geom_point(aes(x = DayOfWeek, y = Hour, size = Frequency, colour = Frequency), stat = "identity")
g <- g + scale_colour_continuous(low = "yellow", high = "red")
g

##########################################################################

####3. Calendar Heatmap for potholes
library(lattice)
library(chron)
library(plyr)
require(grid)

head(su_potholes)

potholes$newdate<-as.Date(Date,format = "%m/%d/%Y")

x=count(potholes,c("newdate"))

calendarHeat(x$newdate, 
             x$freq, varname="Potholes Fixed by 2016")

#copy
calendarHeat2<-calendarHeat

#insert line to calulate day number
bl<-as.list(body(calendarHeat2))
body(calendarHeat2) <- as.call(c(
  bl[1:14], 
  quote(caldat$dom <- as.numeric(format(caldat$date.seq, "%d"))),
  bl[-(1:14)]
))

#change call to level plot
lp<-as.list(body(calendarHeat2)[[c(32,2,3)]])
lp$dom <- quote(caldat$dom)
lp$panel <- quote(function(x,y,subscripts,dom,...) {
  panel.levelplot(x,y,subscripts=subscripts,...)
  panel.text(x[subscripts],y[subscripts],labels=dom[subscripts])
})
body(calendarHeat2)[[c(32,2,3)]]<-as.call(lp)

calendarHeat2(x$newdate, x$freq, varname="Potholes Fixed by 2016")
################################################################
