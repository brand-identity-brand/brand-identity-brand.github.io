# Graphql

Graphql is an amazing tool. Back when I couldnt figure out the actual database and ui/ux I discovered graphql and immidiately knew this was what I needed. I felt like the luckiest man on earth. 

Intuitively, I knew there is a soft-contract that both end should theoretically follow but can never do so in production, becuase there was no tool to desribe this abstraction layer. Or, the abstraction layer was not "seen" because that was not how we discoeverd the pie, therefore do not know there is another way to cut the pie. Two ends always has to somehow become puzzle pieces instead of a clean cut, both ends compormise the outward facing layer to wait for the other end's next update.

Implementing graphql as a part of the code infrastructure is a lot of work for little return on the production application. Skip the graphql software implementaion but design the code according to the shape of graphql schema. 


## There is a clean cut between data(database schema) and The presentation of data(ux/ui). 

The clean cut is graphql.

The application should own its domain logic, state, and reusable interface.
Any React environment should be able to render it as a Component if given backend connectivity.
This also tests the speration of presentation vs data.
Presentation logic should stay in presentaion code and data logic should stay in data. The cleaner the seperation the more portable the application is. 
This portability issue is the reason graphql is a very good tool.
It helps articulate the true mental graph that you woulnt be able to describe with regular general purpose langauge. 

Graphql schema design is a very good tool for this purpose. It has the ability to articulate the mental model of the data-relation-graph since all language encodes graph like parrelle signals into a serial stream of signals. Most often we describe this shape in SQL, even if we visualise this graph, it still doesnt match the actual consumer logic's use cases. The natural next step is create ORM. Use the data logic layer's language to describe the shape. However this is exposing the implementation as an interface solution. The most mature solution is graphql. It is basically what ORMs tried to be but couldnt be. 