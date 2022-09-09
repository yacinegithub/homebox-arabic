# Welcome to Homebox!

Homebox is the inventory and organization system built for the Home User! With a focus on simplicity and ease of use, Homebox is the perfect solution for your home inventory, organization, and management needs. While developing this project I've tried to keep the following principles in mind:

- _Simple_ - Homebox is designed to be simple and easy to use. No complicated setup or configuration required. Use either a single docker container, or deploy yourself by compiling the binary for your platform of choice.
- _Blazingly Fast_ - Homebox is written in Go which makes it extremely fast and requires minimal resources to deploy. In general idle memory usage is deploy 75MB for the whole container.
- _Portable_ - Homebox is designed to be portable and run on any platform. It can be run as a single docker container, or compiled for your platform of choice. We use SQLite and an embedded Web UI to make it easy to deploy and use.

## Project Status

Homebox is currently in active development and is currently in **preview** stage. This means that the project may still be unstable and clunky. Overall we are striving to not introduce any breaking changes and have checks in place to ensure migrations and upgrades are smooth. However, we do not guarantee that there will be no breaking changes. We will try to keep the documentation up to date as we make changes.

## Features

- Create and Manage _Items_ by provided a name and description - That's it! Homebox requires only a few details to be provided to create an item, after that you can specify as much detail as you want, or hide away some of the things you won't ever need.
- Optional Details for Items include
    - Warranty Information
    - Sold To Information
    - Purchased From Information
    - Item Identifications (Serial, Model, etc)
    - Categorized Attachments (Images, Manuals, General)
    - Arbitrary/Custom Fields -  _Coming Soon!_
- Csv Import for quickly creating and managing items - _Export Coming Soon!_
- Organize _Items_ by creating _Labels_ and _Locations_ and assigning them to items.
- Multi-Tenant Support - All users are placed inside of a group and can only see items that are apart of their group. Invite family members to your group, or share an instance among friends!


## Why Not Use Something Else?

There are a lot of great inventory management systems out there, but none of them _really_ fit my needs as a home user. Snipe-IT is a fantastic product that has so many robust features and management options that it's easy to become overwhelmed and confused. I wanted something that was simple and easy to use that didn't require a lot of cognitive overhead to manage. I primarily built this to organize my IOT devices and save my warranty and documentation information in a central, searchable location.

### Spreadsheet

That's a fair point. If your needs can be fulfilled by a Spreadsheet, I'd suggest using that instead. I've found spreadsheets get pretty unwieldy when you have a lot of data and it's hard to keep track of what's where. I also wanted to be able to search and filter my data in a more robust way than a spreadsheet can provide. I also wanted to leave to door open for more advanced features in the future like maintenance logs, moving label generators, and more.

### Snipe-It?

Snipe-It is the gold standard for IT management. If your use-case is to manage consumables and IT physical infrastructure I highly suggest you look at Snipe-It over Homebox, it's just more purpose built for that use case. Homebox is, in contrast, purpose built for the home user, which means that we try to focus on keeping things simple and easy to use. Lowering the friction for creating items and managing them is a key goal of Homebox which means you lose out on some of the more advanced features. In most cases this is a good trade-off.