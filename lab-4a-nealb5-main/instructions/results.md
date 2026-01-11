### Server 1:
```JS
PASS  ./api.test.js
  API Tests
    ✓ CREATE (169 ms)
    ✓ READ ONE (763 ms)
    ✓ READ ALL (534 ms)
    ✓ UPDATE (585 ms)
    ✓ DELETE (520 ms)
    ✓ READ USER (63 ms)
    ✓ READ ONE NONEXISTENT (116 ms)
    ✓ DELETE NONEXISTENT (117 ms)
    ✓ UPDATE NONEXISTENT (115 ms)
    ✓ DELETE INVALID ID (70 ms)
    ✓ READ ALL NO COOKIE (7 ms)
    ✓ CREATE NOT ENOUGH DATA (177 ms)

...

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
```

### Server 2: 
```JS
FAIL  ./api.test.js
  API Tests
    ✕ CREATE (172 ms)
    ✕ READ ONE (1517 ms)
    ✕ READ ALL (664 ms)
    ✕ UPDATE (628 ms)
    ✓ DELETE (512 ms)
    ✓ READ USER (64 ms)
    ✓ READ ONE NONEXISTENT (114 ms)
    ✓ DELETE NONEXISTENT (111 ms)
    ✓ UPDATE NONEXISTENT (115 ms)
    ✓ DELETE INVALID ID (63 ms)
    ✓ READ ALL NO COOKIE (6 ms)
    ✕ CREATE NOT ENOUGH DATA (404 ms)

...

Test Suites: 1 failed, 1 total
Tests:       5 failed, 7 passed, 12 total
```

### Server 3:
```JS
FAIL  ./api.test.js
  API Tests
    ✓ CREATE (168 ms)
    ✓ READ ONE (550 ms)
    ✓ READ ALL (432 ms)
    ✓ UPDATE (598 ms)
    ✕ DELETE (303 ms)
    ✓ READ USER (61 ms)
    ✕ READ ONE NONEXISTENT (118 ms)
    ✕ DELETE NONEXISTENT (166 ms)
    ✕ UPDATE NONEXISTENT (226 ms)
    ✓ DELETE INVALID ID (68 ms)
    ✓ READ ALL NO COOKIE (8 ms)
    ✓ CREATE NOT ENOUGH DATA (168 ms)

...

Test Suites: 1 failed, 1 total
Tests:       4 failed, 8 passed, 12 total
```

### Server 4:
```JS
FAIL  ./api.test.js
  API Tests
    ✓ CREATE (185 ms)
    ✓ READ ONE (555 ms)
    ✓ READ ALL (538 ms)
    ✓ UPDATE (596 ms)
    ✓ DELETE (462 ms)
    ✕ READ USER (72 ms)
    ✓ READ ONE NONEXISTENT (116 ms)
    ✓ DELETE NONEXISTENT (111 ms)
    ✓ UPDATE NONEXISTENT (111 ms)
    ✕ DELETE INVALID ID (71 ms)
    ✓ READ ALL NO COOKIE (6 ms)
    ✓ CREATE NOT ENOUGH DATA (173 ms)

...

Test Suites: 1 failed, 1 total
Tests:       2 failed, 10 passed, 12 total
```
