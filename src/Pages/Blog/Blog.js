import React from 'react';

const Blog = () => {
    return (
        <div className='container mx-auto px-6 md:px-40'>
            <h1 className='text-3xl font-bold bg-gray-300 text-accent text-center rounded md:w-1/6 py-3 mx-auto my-8'>Blog</h1>
            <div className='bg-gray-300 text-left pl-12 p-12 rounded mb-8'>
                <h3 className='text-2xl font-bold mb-4'>What are the different ways to manage a state in a React application?</h3>
                <p>
                    <b>In React apps, there are at least five ways to handle a state.</b> <br />
                    1.Using URL. <br />
                    2.Using Web Storage. <br />
                    3.Using Local State. <br />
                    4.Use Lifted State. <br />
                    5.Use Derived State. <br />
                </p>
            </div>
            <div className='bg-gray-300 text-left pl-12 p-12 rounded mb-8'>
                <h3 className='text-2xl font-bold mb-4'>How does prototypical inheritance work?</h3>
                <p>
                    Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                </p>
            </div>
            <div className='bg-gray-300 text-left pl-12 p-12 rounded mb-8'>
                <h3 className='text-2xl font-bold mb-4'>What is a unit test? Why should we write unit tests?</h3>
                <p>
                    Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. <br />
                    <b>Why should we write unit tests:</b> <br />
                    Unit Testing is important for React Apps, as it helps in testing the individual functionality of React components. Moreover, any error in code can be identified at the beginning itself, saving time to rectify it at later stages. Some of the core benefits of Unit Testing are:

                    Process Becomes Agile: Agile Testing process is the main advantage of unit testing. When you add more features to the software, it might affect the older designs and you might need to make changes to the old design and code later. This can be expensive and require extra effort. But if you do unit testing, the whole process becomes much faster and easier.
                    Quality of code: Unit testing significantly improves the quality of the code. It helps developers to identify the smallest defects that can be present in the units before they go for the integration testing.
                    Facilitates change: Refactoring the code or updating the system library becomes much easier when you test each component of the app individually.
                </p>
            </div>
            <div className='bg-gray-300 text-left pl-12 p-12 rounded mb-8'>
                <h3 className='text-2xl font-bold mb-4'>React vs. Angular vs. Vue?</h3>
                <p>
                    <b>React:</b>
                    React is considered a UI library. They define themselves as:
                    “A JavaScript library for building user interfaces”
                    Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook's products are made with React.
                    <br />
                    <b>Angular:</b>
                    Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as:
                    “The modern web developer's platform”
                    It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.
                    <br />
                    <b>Vue:</b>
                    Vue.js is,“A progressive JavaScript framework”Vue.js is developed and led by Evan You, but also it counts on a huge open-source community.
                </p>
            </div>
        </div>
    );
};

export default Blog;