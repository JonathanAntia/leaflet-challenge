![USGS Logo](/images/USGSlogo.png)
Format: ![Alt Text](url)

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

This project aims to create visualizations of USGS earthquake data. They collect a massive amount of data from all over the world each day, and the application developed in this project provides a meaningful way of displaying it.

# Leaflet Challenge

## Level 1: Basic Visualization

![Basic Visualization of Earthquake Magnitudes](/images/NothAmerica_level1.png)
Format: ![Alt Text](url)

The first task is to optain and visualize the dataset.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes.
This project uses the dataset for the past 30 Days M1.0+ Earthquakes:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson - geojson!
[GitHub](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson)

The dataset was obtained from the USGS Earthquake Hazards Program:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php - USGS Earthquake Hazards Program!
[GitHub](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## Level 2: More Data

![Visualization of Fault Lines and Earthquake Magnitude](/images/NorthAmerica_level2.png)
Format: ![Alt Text](url)

Other datasets help ilustrate the relationship between earthquakes and fault-lines. The dataset is provided in the static/data folder.

In this step we are going to:


* Plot a second data set on our map.


* Only plot the fault-lines which have the following slip_rate values, Greater than 5.0 mm/yr and Between 1.0 and 5.0 mm/yr


* Use a higher stroke-weight for fault-lines with higher slip_rate


* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.


* Add layer controls to our map as shown in map below.


* Include popups that provide additional information about the fault when a fault-line is clicked.

![App GIF](/images/Earthquakes - Google Chrome 2020-09-19 16-04-48.mp4)
Format: ![Alt Text](url)