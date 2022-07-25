# Overview

**About**

Pegasus is a tool for making it easy to create user input data flows e.g Wizards, questionairs e.t.c. You can add basic sequences, apply conditional logic that needs to be satisfied before users of your flow moves on to the next step. You also have the ability to run A/B testing on your flows therefore allowing you to segment which types of users see particular flows. Think of pegasus as highly customisable striped down version of type form.

### Features overview

- Create custom components for you flows
- Basic linear flows - no conditional logic invovled
- Conditional logic, base on what they have select - use what the user has inputed to determine whats next
- A/B testing for experiement - allows you to segement user who will see particular flows

### Quick start

**Basic flow**

screen recording [example](./examples/basic.gif)

1. add - show “tags” in start view
2. create - tags view
3. add - show “done” in tags view
4. run config - click next should take you start view → tags view

**Conditional flow**

screen recording [example](./examples/conditional.gif)

1. add - if user equal "customer" then show "eventType” in start view
2. create - eventType view
3. add - show “done” in eventType view
4. run config - click next should take you start view → eventType view
