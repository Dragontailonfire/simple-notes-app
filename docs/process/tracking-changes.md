# Using changesets

1. Run changeset and choose level (major/minor/patch) and provide summary.

``` bash
pnpx changeset
```

2. Apply version update

``` bash
pnpx changeset version
```

3. Commit changes

``` bash
git add .
git commit -m "fix(web): preserve sorting state across navigation (v1.1.1)"
```

4. Tag

``` bash
pnpx changeset tag
```

5. Push

``` bash
git push origin main --follow-tags
```
