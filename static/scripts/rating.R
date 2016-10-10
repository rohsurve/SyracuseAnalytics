getwd()
get.file()
attach(ratings)

my.file <- file.choose()
ratings<- read.csv(file = my.file, header=TRUE, na.strings=c(""),stringsAsFactors = FALSE)


########4. Line chart. Ratings by year

ratings$rate<- with(ratings,ifelse(ratings$overall>7,"Good"
              ,ifelse(ratings$overall<6,"Bad","Fair")))

new<-xtabs(~rate + Year,data = ratings)

head(ratings)
library("reshape2")
library("ggplot2")
library("RColorBrewer")

linechart<- melt(new, id="Year")# convert to long format
cols <- c("Rate","Year","NumberOfRoads")
colnames(linechart) <- cols

q<-ggplot(data=linechart,
       aes(x= Year, y=NumberOfRoads, colour=Rate)) +
  geom_line(size=2)+
  geom_point(size=3.5)+
  scale_x_continuous(breaks=linechart$Year)

q <- q + scale_color_brewer(palette="Pastel1")
q

################################################

########5. Barchart. Road Overlay by year

ratings1<-subset(ratings,ratings$dateLastOverlay!="83,99" 
                 & ratings$dateLastOverlay!="92,99"& ratings$dateLastOverlay!="")

d<-count(ratings1,c("dateLastOverlay"))

q<-ggplot(data = d,
          aes(x= dateLastOverlay, y=freq)) +
  geom_bar(stat = "identity", position = "stack",fill='lightblue',color="black")+
  coord_flip()+
  theme_minimal()+
  ggtitle("Road Overlay")+
  scale_y_continuous(limits = c(0,6500))
