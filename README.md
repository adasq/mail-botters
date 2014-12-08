mail-botters
============

Receive your mail by REST API based on http://www.migmail.net/



### 1. send mail 

send mail to migmail service account, to i.e. mb-test@migmail.net

### 2. receive mail

You can receive last mail via REST API, i.e:

http://mail-botters.rhcloud.com/inbox?login=mb-test&readed=true



### 3. inbox params:

- login: `string` (2-32 chars) your login name, value: `test` means, that you want to receive mail from  `test@migmail.net`
- readed: `true` or `false`, whenever you want to receive last readed, or unreaded mail

### 4. resposne:

when error:

```json
{"error":true,"reason":"inbox is empty"}
```

otherwise:

```json
{"error":false,
"data":
  {
    "title":"Re: Testing REST API",
    "from":"source-mail@address.io",
    "body":
      {
        "text":"email content, presented as text",
        "links":["list", "of", "http", "links"]
      }
  }
}
```

