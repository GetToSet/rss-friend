# rss-friend

A simple Node.js service that provides common functionalities to enhances the RSS workflow.

## Functionalities

Currently only one functionality has been implemented:

### JSON Feed to RSS

#### GET `/json-feed-to-rss`

Fetch from the URL that provides a JSON feed and convert it to an RSS format.

**URL Parameters**

|  Name | Required |  Type  | Description                        |
| ----: | :------: | :----: | ---------------------------------- |
| `url` | required | string | The URL to fetch for the JSON feed |

**Response**

The corresponding RSS feed in XML if success.

---

### Errors

Responses confirm to [standard HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status), additional information is provided in the JSON body like the following:

```json
{ "status": 400, "reason": "url empty or not found" }
```

## License

MIT
