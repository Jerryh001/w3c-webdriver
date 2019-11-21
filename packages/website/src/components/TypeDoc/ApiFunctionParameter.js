import React from 'react';
import InlineCode from '../content/InlineCode';
import Link from '../content/Link';
import ApiDescription from './ApiDescription';
import slugify from '@sindresorhus/slugify';

export const getParameterType = type => {
  switch (type && type.type) {
    case 'reflection':
      return 'object';
    case 'intrinsic':
      return type.name;
    case 'union':
      return type.types
        .map(type => getParameterType(type))
        .filter(name => name !== 'undefined' && name !== 'false')
        .map(name => (name === 'true' ? 'boolean' : name))
        .reduce((acc, item, index, items) => (index !== items.length - 1 ? [...acc, item, ' | '] : [...acc, item]), []);
    case 'reference':
      return type.id ? (
        <Link key={type.id} href={`#${slugify(type.name)}`}>
          {type.name}
        </Link>
      ) : (
        type.name
      );
    case 'array':
      return <>{getParameterType(type.elementType)}[]</>;
    case 'stringLiteral':
      return `'${type.value}'`;
    default:
      return type.type;
  }
};

const getSubTypes = type => {
  if (!type || !type.declaration) {
    return null;
  }

  return (
    <ul>
      {type.declaration.children.map(item => (
        <ApiFunctionParameter key={item.id} {...item} />
      ))}
    </ul>
  );
};

const ApiFunctionParameter = ({ name, type, comment, flags }) => {
  const title = [name, flags && flags.isOptional ? '?' : '', ': '].join('');

  return (
    <li>
      <InlineCode>
        {title}
        {getParameterType(type)}
      </InlineCode>{' '}
      <ApiDescription {...comment} />
      {getSubTypes(type)}
    </li>
  );
};

export default ApiFunctionParameter;
