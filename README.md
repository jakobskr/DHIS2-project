# IN5320-PROJECT

dhis-portal --server=course --instance=course

yarn start


Your app's functionality:

    We have implemented all of the fundamental requirements.
    Extra requirements that we have chosen to implement:
        A list of overdue events, a list of completed events, an overview of all tracked index and contacts, and a subview of the contacts for each case in both Overview and daily workload as well as list how many contacts each tracked instance has. And you can easily open the capture tracker for a given Event/case from all of different overviews that we have implemented. Future workload lets you selects from 4 predefined dates and also lets you choose your own timeframe (which is neat). 


    How this is implemented (just a brief explanation)
        Overdue, completed and future workload are all implemented kind of simarly all of them uses the events accespoint with different parameters. After getting all of the events it uses the trackedEntityInstances endpoint to get info about the events that are listed. we tried to use the events/eventRow endpoint, but that was much slower than doing in the current implemented way.

        Daily workload and overview uses trackedEntityInstance endpoint to get information about the tracked cases. Daily workload has to do some client side filtering to find cases that has a due date today, due to us not finding a way to query for dueDate with this endpoint.

        The subview contacts for each tracked instance functionality uses the relationship attribute that we recieved from trackedEntityInstance, and then we query trackedentity to get enough information to be able to fill out the contacts table.


    Any missing functionality/implementations, and things that do not work optimally. 

    We have implemented all the fundamental requirements so there isn't really anything missing on that aspect. However, we are a bit unsure if the future workload is actually getting all of the events, cause it seems like some events are hiding from us. The design might be a bit lackluster since we had to rush it. And index table and the contacts table in daily workload sometimes overlap, but we can't figure out the problem.

    yank note:
    We have hardcoded some dates into our code, but this is only for testing and demostration purposes as most of our test data is in early november, so for simplicity sakes we have set "today" to be either first or second of november. There are also "some" warning about detection in order of hooks use, but that seems to be due to the if (loading) thingy. It also complains about us not giving keys to tablerows, but that seems to be a straight up lie because we are giving keys to things...
