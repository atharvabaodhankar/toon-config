// Serializer: Convert JS Object to TOON format

class Serializer {
  constructor(indent = 3) {
    this.indent = indent;
  }

  serialize(value, depth = 0) {
    const type = typeof value;
    const spaces = ' '.repeat(depth * this.indent);
    
    if (value === null || value === undefined) {
      return 'STR(value, "")';
    }
    
    if (Array.isArray(value)) {
      return this.serializeList(value, depth);
    }
    
    if (type === 'object') {
      return this.serializeObject(value, depth);
    }
    
    if (type === 'string') {
      return `"${this.escapeString(value)}"`;
    }
    
    if (type === 'number') {
      return value.toString();
    }
    
    if (type === 'boolean') {
      return value.toString();
    }
    
    return '""';
  }

  serializeObject(obj, depth = 0) {
    const spaces = ' '.repeat(depth * this.indent);
    const innerSpaces = ' '.repeat((depth + 1) * this.indent);
    
    const entries = Object.entries(obj).map(([key, value]) => {
      const type = this.inferType(value);
      const serializedValue = this.serialize(value, depth + 1);
      
      if (type === 'OBJ' || type === 'LIST') {
        return `${innerSpaces}${type}(${key},\n${innerSpaces}${this.indent > 0 ? '   ' : ''}${serializedValue}\n${innerSpaces})`;
      }
      
      return `${innerSpaces}${type}(${key}, ${serializedValue})`;
    });
    
    if (depth === 0) {
      return `OBJ(\n${entries.join(',\n')}\n)`;
    }
    
    return entries.join(',\n');
  }

  serializeList(arr, depth = 0) {
    const spaces = ' '.repeat(depth * this.indent);
    const items = arr.map(item => this.serialize(item, depth + 1));
    
    if (items.length === 0) {
      return 'LIST()';
    }
    
    return `LIST(${items.join(', ')})`;
  }

  inferType(value) {
    if (value === null || value === undefined) {
      return 'STR';
    }
    
    if (Array.isArray(value)) {
      return 'LIST';
    }
    
    const type = typeof value;
    
    if (type === 'object') {
      return 'OBJ';
    }
    
    if (type === 'string') {
      return 'STR';
    }
    
    if (type === 'number') {
      return Number.isInteger(value) ? 'INT' : 'FLOAT';
    }
    
    if (type === 'boolean') {
      return 'BOOL';
    }
    
    return 'STR';
  }

  escapeString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
  }
}

function stringifyTOON(obj, indent = 3) {
  const serializer = new Serializer(indent);
  return serializer.serialize(obj);
}

export { Serializer, stringifyTOON };
