# Contributions to Notes Example

We welcome contributions to the Notes project!

## How to Contribute
Contributions to Notes - fixing bugs, adding features, adding documentation - are welcome. We accept contributions via [Github Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

The workflow for contributing to this project is the following:

## [Issues]()

**1. Identify an issue you want to work on**

Checkout our [Kanban Board](https://github.com/anayib/notes-example-project/projects/1?add_cards_query=is%3Aopen) to identify the issues that are ready for work (they are ordered by priority). Once you have selected one, assign it to yourself (you can\`t have more than **two** issues assigned to you at the same time).

**2. Create a branch**

```
$ git checkout main
$ git pull
$ git switch -C feature/xx-short-description
```

The name of the branch should start with the number of the issue, followed by max three keywords that describe the issue (e.g. `23-fix-homepage`, `56-change-font`, etc.).

**3. Work on the branch**

Commit often and try to create small commits, just be sure that the tests are passing before commiting. Rebase against the upstream frequently to prevent your branch from diverging significantly:

```
$ git fetch origin
$ git rebase origin/main
```

Once you finish, you can push the branch and initiate a pull request.

**Note:** remember that an issue is not finished until it's fully tested!

**4. Push the branch and initiate the pull request**

When you are done, and you have organized your commits locally, it's time to push the branch.

```
$ git push -u origin feature/xx-short-description
```

Open a pull request (PR) on Github.

### Writing good commit messages
> A standard for writing commit messages.

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with [SemVer](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

```sh
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **fix**: a commit of the type `fix` patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
2. **feat**: a commit of the type `feat` introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
3. **BREAKING CHANGE**: a commit that has a footer `BREAKING CHANGE`:, or appends a ! after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. *types* other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.

Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

#### Examples

> Commit message with description and breaking change footer
```sh
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```


> Commit message with ! to draw attention to breaking change
```sh
feat!: send an email to the customer when a product is shipped
```

> Commit message with scope and ! to draw attention to breaking change
```sh
feat(api)!: sendan email to the customer when a product is shipped
```

> Commit message with both ! and BREAKING CHANGE footer
```sh
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

> Commit message with no body
```sh
docs: correct spelling of CHANGELOG
```

> Commit message with scope
```sh
feat(lang): add polish language
```

> Commit message with multi-paragraph body and multiple footers
```sh
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

#### Rules

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## [Pull Requests]()

After you open the Pull Request, there will probably be some discussion in the comments field of the request itself.
