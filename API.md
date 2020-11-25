## Functions

<dl>
<dt><a href="#File">File()</a></dt>
<dd><p>Component is used to describe to the generator that you want a file to be created and rendered based on the defined children.</p>
</dd>
<dt><a href="#Indent">Indent()</a></dt>
<dd><p>Component is for wrapping multiple components and apply an indentation on those. </p>
<p>It supports any form of nested components as well, meaning you can have as many nested <code>Indent</code> components as you would like.</p>
</dd>
<dt><a href="#Text">Text()</a></dt>
<dd><p>Component is for defining a group of text which should be rendered on the same line.</p>
</dd>
</dl>

<a name="IndentationTypes"></a>

## IndentationTypes : <code>enum</code>
Type of indentation to use

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TABS | <code>string</code> | indicate to use tabs as separator |
| SPACES | <code>string</code> | indicate to use spaces as separator |

<a name="File"></a>

## File()
Component is used to describe to the generator that you want a file to be created and rendered based on the defined children.

**Kind**: global function  
**Component**:   
**Example**  
```js
const name = "test.js"
const permissions = "777"
return (
  <File size={size} type={type}>Test</File>
)
```
<a name="Indent"></a>

## Indent()
Component is for wrapping multiple components and apply an indentation on those. 

It supports any form of nested components as well, meaning you can have as many nested `Indent` components as you would like.

**Kind**: global function  
**Component**:   
**Example**  
```js
const size = 4
const type = IndentationTypes.SPACES
return (
  <Indent size={size} type={type}>Test</Indent>
)
```
<a name="Text"></a>

## Text()
Component is for defining a group of text which should be rendered on the same line.

**Kind**: global function  
**Component**:   
**Example**  
```js
const size = 4
const type = IndentationTypes.SPACES
return (
  <Text size={size} type={type}>Test</Text>
)
```
