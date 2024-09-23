# The CSCU's public website

## Set up

This guide assumes you have [Git](https://git-scm.com/) installed on your computer. If not, see the link for instructions.

This website is built using a static site generator called Cobalt. A static site generator is a program that takes a bundle of static text files and generates a complete website. This way, you can easily create a dynamic website that's simple to update without needing a complete back end (which is a restriction of leeching hosting from GitHub).

Cobalt is installed and run on the command line. For instructions on how to set it up on MacOS, Linux or on Windows using WSL, see [the Cobalt installation docs](https://cobalt-org.github.io/getting-started/). In short, run this command in your terminal:

```bash
curl -LSfs https://raw.githubusercontent.com/crate-ci/gh-install/master/v1/install.sh | sh -s -- --git cobalt-org/cobalt.rs --crate cobalt
```

For usage not covered in this README, you may also refer to [the Cobalt documentation](https://cobalt-org.github.io/docs/).

Once you have Cobalt installed, run:

```
git clone https://github.com/cscu-ok/cscu-ok.github.io
cd cscu-ok.github.io
cobalt serve
```

Running `cobalt serve` starts a small web server on your computer serving the site that automatically updates as you change things. Open the URL `http://localhost:1024` to see a preview of the website.

## How-to

### Update the quick links

The quick links page is generated using data specified in the YAML "front matter" of the `index.liquid` document. As an example:

```
data:
    links:
    - href: https://www.example.com/some/web/page
      title: The link title
      description: >
        This is a longer description
        It can take up more than one line!
```

If you specify `description: null`, then the description won't be rendered at all. The title will be placed in the center of the link's rectangle with a bit of extra spacing.
