1. Fix issue with module state array - 

```
@state('referal','account') referals;

// here referals is an array, when an array item is added referals is not updated
```